import {makeAutoObservable} from "mobx";

export default class BugsStore{
    constructor() {
        this._bugs=[]
        makeAutoObservable(this)
    }
    get bugs() {
        return this._bugs
    }
    setBugs(bugs) {
         this._bugs=bugs
    }
    getType(type){
        switch (type){
            case "dontCheck":
                return "warning"
                break;
            case "canceled":
                return "danger"
                break;
            case "dontCheck":
                return "succes"
                break;
        }
    }
}