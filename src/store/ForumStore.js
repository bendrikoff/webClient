import {makeAutoObservable} from "mobx";

export default class ForumStore{
    constructor() {
        this._forumSection=[]
        this._forumSections=[]
        this._forumTopic=[]
        this._forumComments=[]


        makeAutoObservable(this)
    }
    get forumSection() {
        return this._forumSection
    }
    get forumSections() {
        return this._forumSections
    }

    get forumTopic() {
        return this._forumTopic
    }

    get forumComments() {
        return this._forumComments
    }
    setSection(section){
        this._forumSection=section
    }
    setSections(sections){
        this._forumSection=sections
    }
    setTopic(topic){
        this._forumTopic=topic
    }
    setComment(comment){
        this._forumComments=comment
    }


}