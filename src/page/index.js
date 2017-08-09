import $ from "jquery";
import {POSTM, MODAL} from '../component/service.js';
import {TOOL,EditText} from '../component/tool.js'
export class index{
    constructor(){
    }
    getPost(){}
    initMouse(dom){
        return new TOOL(dom);
    }
}
var a = new index;
var b = a.initMouse('.hm_nav');


export class Text{
    constructor(){}
    hoverState(dom){
        return new EditText(dom);
    }
}
var text = new Text().hoverState(".text-box");
