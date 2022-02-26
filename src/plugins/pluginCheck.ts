import { Capacitor } from "@capacitor/core"
import { StatusBar } from "@capacitor/status-bar"

// Capacitor
if (Capacitor.isPluginAvailable('StatusBar')) {
    (async () => {
        await StatusBar.hide()
    })()
}