import { makeAutoObservable } from "mobx";

export default class CommonStore {

    token: string | null = null;
    appLoaded = false;

    constructor(){
        makeAutoObservable(this);
    }

    setToken = (token: string | null) => {
        if(token) window.localStorage.setItem('jwt', token);
        this.token=token;
    }

    setAppLoaded = () => {
        this.appLoaded=true;
    }
}