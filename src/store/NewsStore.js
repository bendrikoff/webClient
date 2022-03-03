import {makeAutoObservable} from "mobx";

export default class NewsStore{
    constructor() {
        this._news=[]
        this._pages=0
        makeAutoObservable(this)
    }
    get news() {
        return this._news
    }
    get pages() {
        return this._pages
    }
    setNews(news){
        this._news=news
    }
    setPages(pages){
        this._pages=pages
    }


}