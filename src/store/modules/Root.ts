import { iErrorMessage } from './../../interfaces/auth';
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AxiosResponse } from "axios";

import { iLogin, iUserDetail } from "@/interfaces/auth";
import axios from '@/services/axios'

@Module
export default class Root extends VuexModule {
    private token: string | null = null
    private userDetail: iUserDetail | null = null
    private errors!: iErrorMessage

    get getLoggedinUser(): iUserDetail | null {
        return this.userDetail
    }

    get getToken(): string | null {
        return this.token
    }

    get getErrorMessage(): iErrorMessage | null {
        return this.errors
    }

    @Mutation
    SET_TOKEN(token: string): void {
        this.token = token
    }

    @Mutation
    SET_LOGIN_USER(userDetail: iUserDetail): void {
        this.userDetail = { ...userDetail }
    }

    @Mutation
    SET_ERROR_MESSAGE(errorMessage: iErrorMessage): void {
        this.errors = errorMessage
    }

    @Action
    login(formData: iLogin): Promise<void | boolean> {
        return new Promise((resolve, reject) => {

            axios.post('user/login', formData)
                .then((userResponse: AxiosResponse) => {
                    this.context.commit('SET_TOKEN', userResponse.data.token)
                    this.context.commit('SET_LOGIN_USER', userResponse.data)

                    resolve(true)
                })
                .catch((error: iErrorMessage) => {
                    this.context.commit('SET_ERROR_MESSAGE', error?.errors)
                    reject(false)
                })
        })
    }

    @Action
    register(formData: iUserDetail): Promise<void | boolean> {
        return new Promise((resolve, reject) => {

            axios.post('users', formData)
                .then(() => {
                    resolve(true)
                })
                .catch((error: iErrorMessage) => {
                    this.context.commit('SET_ERROR_MESSAGE', error?.errors)
                    reject(false)
                })
        })
    }

    @Action
    logout(): Promise<boolean> {
        return new Promise((resolve, reject) => {

            axios.get('user/logout')
                .then(() => {
                    this.context.commit('SET_TOKEN', null)
                    this.context.commit('SET_LOGIN_USER', {})
                    resolve(true)
                })
                .catch((error: iErrorMessage) => {
                    this.context.commit('SET_ERROR_MESSAGE', error?.errors)
                    reject(false)
                })
        })
    }

    @Action
    resetUser(): Promise<boolean> {
        return new Promise((resolve) => {
            this.context.commit('SET_TOKEN', null)
            this.context.commit('SET_LOGIN_USER', {})

            resolve(true)
        })
    }
}