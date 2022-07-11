import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { mapActions } from 'vuex'
import Slick from 'vue-slick'

/* for PDF Generate */
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { Capacitor } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { DocumentViewer } from '@awesome-cordova-plugins/document-viewer'

import { iOrder, OrderStatus } from '@/interfaces/order'
import OrderProgress from '@/components/order/Status'
import MaterialCard from '@/components/material/Card'
import { iMaterial } from '@/interfaces/app'
import { formatDate } from '@/plugins/filter'

const slickOpt = {
    rows: 0,
    arrows: false,
    dots: true,
    infinite: false
}

@Component({
    methods: {
        ...mapActions({
            getOrder: 'order/getOrder',
            cancelOrder: 'order/cancelOrder'
        })
    }
})
export default class OrderDetail extends Vue {
    private order: iOrder = {} as iOrder
    private isLoading: boolean = false
    private showPDFModal: boolean = false

    private docDefination: TDocumentDefinitions = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        content: [],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        }
    }

    private getOrder!: (id: string) => Promise<iOrder>
    private cancelOrder!: (id: string) => Promise<boolean>

    /**
     * @returns void
     * @params void
     * @descrption runs on components added, calls init function then prepare for PDF's content
     */
    async mounted() {
        await this.init()

        this.docDefination.content = [
            'ID:\n3c4ad94b-0b75-4cec-a903-868847f235ba\n\nOrder Status:\nCancelled\n\nPayment Status:\nUnPaid\n\nOrdered At:\n2022-07-01\n\nOrdered By:\nKuame Mcclure\n\n',
            {
                text: 'Order Summary',
                style: 'header'
            }, {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', 100],
                    body: [
                        [{ text: 'ID', bold: true }, { text: "Name", bold: true }, { text: "Price", bold: true }],
                        ['fa811afc-fd73-45da-a4e3-b208128e38d1', 'totam', 'Rs. 633'],
                        ['fa811afc-fd73-45da-a4e3-b208128e38d1', 'totam', 'Rs. 633'],
                        [{ text: 'Sub Total:', colSpan: 2, bold: true, alignment: 'right' }, '', 'Rs. 1266'],
                        [{ text: 'Deliver Charge:', colSpan: 2, bold: true, alignment: 'right' }, '', 'Rs. 2000'],
                        [{ text: 'Total:', colSpan: 2, bold: true, alignment: 'right' }, '', 'Rs. 3266']
                    ]
                }
            },
        ]
    }

    /**
     * @returns (VNode)Virtial Node for vue component
     * @params void
     * @description contains order's layouts
     */
    render(): VNode {
        return <section class="item__section">
            <header class="item__section__heading">
                <h1 class="h2">Order Detail</h1>
                <div class="item__action">
                    <a href="#" onClick={this.downloadPDF}><span class="icon-pdf"></span></a>
                    <a href="#" class="btn btn__icon" onClick={(event: MouseEvent) => {
                        event.preventDefault()

                        this.init()
                    }}><span class={{ "icon-loop": true, "animate": this.isLoading }}></span></a>
                    {/* Back to detail Page */}
                    <a href="#" onClick={(event: MouseEvent) => {
                        event.preventDefault()
                        this.$router.go(-1)
                    }} class="back"><span class="icon-d-arrow-left"></span></a>
                </div>
            </header>
            <div class="item__description">
                {/* Materials on Order */}
                {this.order.material
                    ? [<h2 class="h4">Items</h2>,
                    <Slick class="item__slider" options={slickOpt} style="margin-bottom: 40px" ref="materialSlider">
                        {this.order.material.map((material: iMaterial) => <MaterialCard item={material} key={material.id} />)}
                    </Slick>]
                    : null}

                {/* Order progress */}
                <h2 class="h4">Order status</h2>
                <OrderProgress current-status={this.order.order_status} style="margin-bottom: 40px" />
            </div>
            <footer class="item__section__footer">
                {this.order.delivery_date
                    ? <em class="item__date">
                        <strong>{this.order.delivery_date}</strong>
                        {formatDate(this.order.delivery_date)}
                    </em>
                    : null}
                {this.order.order_status !== OrderStatus.CANCELLED
                    ? <a href="#" class="btn btn__danger" onClick={(event: MouseEvent) => {
                        event.preventDefault()

                        this.cancelOrder(this.order.id || '')
                            .then(() => {
                                this.init()
                            })
                    }}>Cancel Order</a>
                    : null}
            </footer>

            {/* Preparing for PDF download */}
            {/* PDF Layout */}
            <div class="order--print sr-only" ref="PDFDownload" style="font-family: Arial, sans-serif;">
                <dl>
                    <dt>ID</dt>
                    <dd style="margin-left: 0; margin-bottom: 10px;">{this.order.id}</dd>
                    <dt>Order Status</dt>
                    <dd style="margin-left: 0; margin-bottom: 10px;"><strong style="text-transform: uppercase;">{this.order.order_status}</strong></dd>
                    <dt>Payment Status</dt>
                    <dd style="margin-left: 0; margin-bottom: 10px;"><strong style="text-transform: uppercase;">{this.order.payment_status}</strong></dd>
                    <dt>Ordered At</dt>
                    <dd style="margin-left: 0; margin-bottom: 10px;">{formatDate(this.order.ordered_at, process.env.VUE_APP_DATE_FORMAT)}</dd>
                    {this.order.user
                        ? [
                            <dt>Ordered By</dt>,
                            <dd style="margin-left: 0; margin-bottom: 10px;">{this.order.user.name}</dd>
                        ]
                        : null}
                    {this.order.order_status !== OrderStatus.CANCELLED
                        ? [
                            <dt>Delivery Detail</dt>,
                            <dd style="margin-left: 0; margin-bottom: 10px;">
                                <dl>
                                    <dt>Address</dt>
                                    <dd style="margin-left: 0; margin-bottom: 10px;">{this.order.delivery_address}</dd>
                                    <dt>Cost</dt>
                                    <dd style="margin-left: 0; margin-bottom: 10px;">Rs. {this.order.delivery_charge}</dd>
                                    {this.order.delivery_date
                                        ? [
                                            <dt>Date</dt>,
                                            <dd style="margin-left: 0; margin-bottom: 10px;">{formatDate(this.order.delivery_date)}</dd>
                                        ]
                                        : null}
                                </dl>
                            </dd>
                        ]
                        : null}
                    {this.order.material
                        ? [
                            <dt>Order Summary</dt>,
                            <dd style="margin-left: 0; margin-bottom: 10px;">
                                <table style="width: 100%; border: 1px solid #606060; border-spacing: 0;">
                                    <thead>
                                        <tr>
                                            <th style="text-align: left; padding: 0 5px; border-bottom: 1px solid #606060;">ID</th>
                                            <th style="text-align: left; padding: 0 5px; border-bottom: 1px solid #606060; border-left: 1px solid #606060;">Name</th>
                                            <th style="text-align: left; padding: 0 5px; border-bottom: 1px solid #606060; border-left: 1px solid #606060;">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.order.material.map((material: iMaterial) => <tr style="border-bottom: 1px solid #606060;">
                                            <td style="white-space: nowrap; padding: 0 5px; border-bottom: 1px solid #606060;"><span class="text-wrap">{material.id}</span></td>
                                            <td style="width: 40%; padding: 0 5px; border-bottom: 1px solid #606060; border-left: 1px solid #606060;">{material.name}</td>
                                            <td style="width: 70px; padding: 0 5px; border-bottom: 1px solid #606060; border-left: 1px solid #606060;">Rs. {material.price}</td>
                                        </tr>)}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th style="text-align: left; padding: 0 5px;" colspan="2">Total</th>
                                            <th style="text-align: left; padding: 0 5px; border-left: 1px solid #606060;">Rs. {this.order.total}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </dd>
                        ]
                        : null}
                </dl>
            </div>
        </section>
    }

    /**
     * @returns void
     * @params void
     * @description gets order with order's Id
     **/
    async init() {
        this.isLoading = true
        this.order = await this.getOrder(this.$route.params.id)
        this.isLoading = false
    }

    /**
     * @returns void
     * @params event is MouseEvent
     * @description downloads PDF on button click
     **/
    downloadPDF(event: MouseEvent) {
        event.preventDefault()

        const fileName = 'order-' + (this.order.id ? this.order.id : '')

        if (pdfMake.vfs === undefined)
            pdfMake.vfs = pdfFonts.pdfMake.vfs

        const pdfOBJ = pdfMake.createPdf(this.docDefination)

        if (Capacitor.getPlatform().toLowerCase() === 'web') {
            pdfOBJ.download(fileName)
        } else {
            pdfOBJ.getBase64(async (data) => {
                try {
                    const path = `${fileName}.pdf`

                    const apdf = await Filesystem.writeFile({
                        path,
                        data,
                        directory: Directory.Library,
                        recursive: true
                    })

                    const finalURI = await Filesystem.getUri({
                        directory: Directory.Library,
                        path
                    })

                    DocumentViewer.viewDocument(finalURI.uri, 'application/pdf', {
                        title: fileName,
                        print: {
                            enabled: true
                        }
                    })

                    console.log(apdf);
                    
                } catch (e) {
                    console.log('Unable to write file ', e);
                }
            })
        }
    }
}