import {makeAutoObservable} from "mobx";

export default class SupportStore{
    constructor() {
        this._faq=[]
        this._requests=[]
        makeAutoObservable(this)
    }
    get faq() {
        return this._faq
    }
    setFaq(faq) {
        this._faq=faq
    }

    get requests() {
        return this._requests
    }
    setRequests(requests){
        this._requests=requests
    }


}