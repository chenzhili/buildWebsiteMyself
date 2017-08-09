//工具模块
import $ from "jquery";
export class TOOL {
    constructor(dom) {
        this._MouseOverEvent(dom);
    }

    //鼠标移入弹出控制
    _MouseOverEvent(dom) {
        let ctrl = dom || '';
        var domx = $(ctrl);
        domx.hover(() => {
            $('.tools').html('');
            var wh = domx.offset();
            var ht = domx.innerHeight();
            this.judegeTotal(ctrl, wh, ht);
        }, (e) => {
            if (e.toElement == $('.ctrl_tools')[0]) return;
            else {
                this._toolsInit();
            }
        });
        $('.ctrl_tools').on('mouseleave', (e) => {
            if (e.toElement == $(domx)[0]) return;
            else {
                this._toolsInit();
            }
        })
    }

    //鼠标移除控制
    _MouseOutEvent(dom) {
        $(dom).on('mouseleave', () => {

        })
    }

    //tools控制层初始化
    _toolsInit() {
        $('.ctrl_tools').removeAttr("style");
        $('.tools').html('');
        $('.ctrl_tools').off('mouseout');
    }

    //判断弹出层
    judegeTotal(dom, wh, ht) {
        var domx;
        dom.match('.') ? domx = dom.replace('.', '') : domx = dom.replace('#', '');
        //console.log(dom);
        switch (domx) {
            case 'hm_nav':
                this.hmtotalMouse(dom, wh, ht);
                break;
        }
    }

    //导航对应弹出层
    hmtotalMouse(dom, wh, ht) {
        var left = Math.floor(wh.left);
        var ht = Math.floor(ht + wh.top);
        var modal = new TotalModal;
        var tag = '<ul class="hm_nav_tl"><li class="hm_li_clnm">管理栏目</li><li>更换模板</li><li>隐藏</li></ul>';
        $('.tools').html(tag);
        $('.ctrl_tools').css({ 'top': ht, 'left': left });
        $('.hm_li_clnm').on('click', () => {
            var ta=$(dom).find("a");
            let params={
                modal:{
                   dom:ta
                }
            };
            modal.modalTotal(params);
        })
    }
}

/* 第一层modal模块
* 参数 params--title(标题) --dom(传入的dom) --ok(确定按钮) --cancel(取消按钮)
* fn 确定回调 ，efn 取消回调
*/
export class TotalModal {
    constructor() { }
    //模态框总控制函数
    modalTotal(params, fn, efn) {
        var modal = new NavModal()._centerModal(params.modal);
        let dom = modal || '';
        let title = params.title || '栏目管理';
        let ok = params.ok || '确定';
        let cancel = params.cancel || "取消";
        let dom_box = '<div class="modal_box"><div class="modal_box_ct"><div class="mbc_hd"><h2>' + title + '</h2><span class="m_frs m_cls">×</span></div>' +
            '<div class="modal_box_inc_val">' + dom + '</div>' +
            '<div class="mbc_hd"><div class="mbc_ok">' + ok + '</div><div class="mbc_cancel m_cls">' + cancel + '</div></div></div></div>';

        this._remove('.modal_box');
        this._create(dom_box);
        $('.m_cls').on('click', () => {
            this._remove('.modal_box');
            efn != undefined ? efn() : '';
        });
        $('.mbc_ok').on('click', () => {
            fn != undefined ? fn() : '';
            this._remove('.modal_box');
        })
    }
    //初始化
    _create(dom) {
        $('body').append(dom);
    }
    //删除
    _remove(dom) {
        $(dom).remove();
    }
}

/**
 * 导航管理模块
 */
export class NavModal {
    constructor() {
    }
    _centerModal(params) {
        let dom = params.dom || '';
        var fetch = this._foreachModal(dom);
        var domx = '<div class="md_nav_box"><h2 class="md_add_ct"><span>添加栏目</span></h2><div class="md_box">' +
            '<div class="mbc_hd"><span class="col-30 f-p-l">栏目名称</span><span class="col-30 f-p-c">开启栏目</span><span class="col-30 f-p-r">操作</span></div>' +
            '<div class="mb-p-8">'+fetch+'</div></div></div>';
        return domx;
    }
    _foreachModal(dom){
        var str='';
        for(var i=0;i<dom.length;++i){
            str+='<ul class="mbc_item"><li class="col-30"><span>' + $(dom).eq(i).html() +'</span><a href="javascript:;" class="md_arrow md_up"></a>' +
            '<a href="javascript:;" class="md_arrow md_down"></a></li>' +
            '<li class="col-30 cf-green f-p-c">√</li>' +
            '<li class="col-30 f-p-r"><a href="javascript:;">[编辑]</a><a href="javascript:;">[删除]</a></li></ul>';
        }
        return str;
    }   
    _removeModal() { }
    _addModal() { }
    _editModal() { }
}
/**
 * 文字编辑模块
 */
 /*每个都要加dom参数，表示是当前的元素内部*/
export class EditText{
    constructor(dom){
        this.menuTemplate = `<div class="edit-menu clearfix">
             <div class="item edit-message fl"></div>
             <div class="item edit-href fl">
                 <div class="href-content">
                    <div class="clearfix">
                        <div class="fl no-border"></div>
                        <div class="fl borders"></div>
                    </div>
                     <div class="clearfix href-input">
                         <div class="fl href-name">链接地址:</div>
                         <input class="fl href-con" type="text">
                     </div>
                     <div class="href-confirm">
                         <button class="href-btn">确定</button>
                         <button class="href-btn cancel-btn">取消</button>
                     </div>
                 </div>
             </div>
             <div class="item edit-delete fl"></div>
         </div>`;
         this.editTemplate = `<div class="edit-edit clearfix">
                     <div class="item bg fl">
                         <div class="bg-item"></div>
                     </div>
                     <div class="txt fl clearfix">
                         <i class="fl item bold">B</i>
                         <i class="fl item italic">I</i>
                         <i class="fl item underline">T</i>
                     </div>
                     <select class="select-style family fl" name="">
                     </select>
                     <select class="select-style edit-size fl" name="">
                     </select>
                     <div class="item rotate fl"></div>
                     <div class="item center fl"></div>
                     <div class="item left fl"></div>
                     <div class="item link fl"></div>
                     <div class="item reset fl"></div>
                 </div>`;
        this.state = 0;
        /*为了隐藏编辑栏的状态*/
        this.editState = 0;
        this.mouseEnter(dom);
        this.mouseOut(dom);
    }
    /*鼠标进入*/
    mouseEnter(dom){
        let $select = $(dom) || "";
        let $editMenu = $(`${dom} .edit-menu-container`) || "";
        if($select){
            $select.hover((e)=>{
                $editMenu.html("");
                $(`${dom} .edit-text`).addClass("active");
                if(this.state == 0){
                    $editMenu.append(this.menuTemplate);
                }
                /*点击事件的发生*/
                this.clickMenu(dom);
                return false;
                /*e.stopPropagation();*/
            });
        }
    }
    /*鼠标出了某个范围*/
    mouseOut(dom,template,domChild){  //template为可选参数
        let $select = $(dom) || "";
        let $selectChild = $(domChild) || "";
        let $editMenu = $(`${dom} .edit-menu-container`) || "";
        let $editEdit = $(`${dom} .edit-edit-container`) || "";
        if($select){
            console.log(this.editState);
            if(!domChild){
                $select.mouseleave((e)=>{
                    console.log(2);
                    if(this.editState == 0){
                        this.state = 0;
                        $editMenu.html("");
                        $editEdit.html("");
                        $(`${dom} .edit-text`).removeClass("active");
                    }
                    /*return false;*/
                    e.stopPropagation();
                });
            }
            /*if(domChild == ".edit-edit"){
                $editEdit.mouseleave((e)=>{
                    console.log(1);
                    $editMenu.html("");
                    $editEdit.html("");
                    $editMenu.append(template);
                    this.clickMenu(dom);
                    /!*这里append是生效了的，不知道为什么有被删了，并且mouseleave的绑定元素为$selectChild就不行*!/
                    event.preventDefault();
                    return false;
                    /!*e.stopPropagation();*!/
                });
            }*/
        }
    }
    /*如果编辑栏出来，隐藏方式是点击编辑区域以外的*/
    hideEdit(dom){
        let $select = $(`${dom} .edit-edit-container`);
        if($select){
            $(document).click((e)=>{
                if(this.editState == 1){
                    $select.html("");
                    $(`${dom} .edit-text`).removeClass("active");
                    this.editState = 0;
                    this.state = 0;
                }
                e.stopPropagation();
            });
            $(dom).click((e)=>{
                e.stopPropagation();
            });
        }
    }
    /*点击第一层的事件*/ //这里注意回调函数中的this，注意回调的写法
    clickMenu(dom){
        if($(`${dom} .edit-menu`)[0]){
            /*是否显示链接*/
            let hrefState = true;
            $(`${dom} .edit-menu`).click((e)=>{
                let regMes = /edit-message/g;
                let regHerf = /edit-href/g;
                let regDelet = /edit-delete/g;
                /*编辑信息*/
                if(regMes.test(e.target.className)){
                        this.state = 1;
                        this.editState = 1;
                        $(`${dom} .edit-edit-container`).html("");
                        $(`${dom} .edit-menu-container`).html("");
                        $(`${dom} .edit-edit-container`).append(this.editTemplate);
                        /*this.mouseOut(dom,this.menuTemplate,".edit-edit");*/
                        this.hideEdit(dom);
                        this.editClick(dom);
                        /*当下拉框发生改变*/
                        this.selectChange(dom,".edit-size");
                        this.selectChange(dom,".family");
                }
                /*编辑链接*/
                if(regHerf.test(e.target.className)){
                    hrefState = !hrefState;
                    if(hrefState){
                        $(`${dom} .href-content`).css("display","none");
                    }else{
                        $(`${dom} .href-content`).css("display","block");
                        this.linkClick(dom);
                    }
                }
                /*删除*/
                if(regDelet.test(e.target.className)){
                    $(`${dom} .edit-menu-container`).html("");
                    $(`${dom} .edit-text`).removeClass("active");
                }
                /*return false;*/
                e.stopPropagation();
            });
        }
    }
    /*链接部分的功能*/
    linkClick(dom){
        let $targetEle = $(`${dom} .href-confirm`);
        if($targetEle){
            $targetEle.click((e)=>{
                console.log(e.target.innerHTML);
                let hrefReg = /^(http|https)?:\/\/www./;
                if(e.target.innerHTML == "确定"){
                    if($(`${dom} .href-con`).val()){
                        let href = hrefReg.test($(`${dom} .href-con`).val())?$(`${dom} .href-con`).val():"https://www."+$(`${dom} .href-con`).val();
                        console.log(href);
                        $(`${dom} .edit-text a`).attr("href",href);
                    }else{
                        console.log("请先输入地址");
                    }
                    $(`${dom} .href-content`).css("display","none");
                }
                if(e.target.innerHTML == "取消"){
                    $(`${dom} .href-content`).css("display","none");
                }
                e.stopPropagation();
            });
        }
    }
    /*编辑部分的功能*/
    editClick(dom){
        /*样式重置*/
        let restStyle = {
            "background-color":"#fff",
            "font-weight":"normal",
            "font-style":"normal",
            "text-decoration":"none",
            "font-family":"microsoft yahei",
            "font-size":"16px",
            "text-align":"left",
            "color":"#000",
            "transform":"rotate(0)"
        };
        /*存储文字的大小*/
        let textSize = [10,12,14,16,18,20,30,40];
        let eleSize = $(`${dom} .edit-size`);
        for(let es=0;es<textSize.length;es++){
            eleSize.append(`<option value="${textSize[es]}">${textSize[es]}px</option>`);
        }
        /*存储文字的样式
         宋体 SimSun
         黑体 SimHei
         微软雅黑 Microsoft YaHei
         微软正黑体 Microsoft JhengHei
         新宋体 NSimSun
         隶书：LiSu
         幼圆：YouYuan
         华文细黑：STXihei
         华文楷体：STKaiti
         华文宋体：STSong
         华文中宋：STZhongsong
         华文仿宋：STFangsong
         方正舒体：FZShuTi
         方正姚体：FZYaoti
         华文彩云：STCaiyun
         华文琥珀：STHupo
         华文隶书：STLiti
         华文行楷：STXingkai
         华文新魏：STXinwei*/
        let textFamily = [
            {name:"宋体",value:"SimSun"},{name:"黑体",value:"SimHei"},{name:"微软雅黑",value:"Microsoft YaHei"},{name:"微软正黑体",value:"Microsoft JhengHei"},
            {name:"新宋体",value:"NSimSun"},{name:"隶书",value:"LiSu"},{name:"幼圆",value:"YouYuan"},{name:"华文细黑",value:"STXihei"},
            {name:"华文楷体",value:"STKaiti"},{name:"华文宋体",value:"STSong"},{name:"华文中宋",value:"STZhongsong"},{name:"华文仿宋",value:"STFangsong"},
            {name:"方正舒体",value:"FZShuTi"},{name:"方正姚体",value:"FZYaoti"},{name:"华文彩云",value:"STCaiyun"},
            {name:"华文琥珀",value:"STHupo"},{name:"华文隶书",value:"STLiti"},{name:"华文行楷",value:"STXingkai"},{name:"华文新魏",value:"STXinwei"},
        ];
        let eleFamily = $(`${dom} .family`);
        for(let fi=0;fi<textFamily.length;fi++){
            eleFamily.append(`<option value="${textFamily[fi].value}">${textFamily[fi].name}</option>`);
        }

        let $select = $(`${dom} .edit-edit`);
        if($select){
            $select.click((e)=>{
                let bgReg = /bg-item/g,boldReg = /bold/g,italicReg = /italic/g,familyReg = /family/g,sizeReg = /edit-size/g,underReg = /underline/g,rotateReg = /rotate/g,
                    centerReg = /center/g,leftReg = /left/g,linkReg = /link/g,resetReg = /reset/g;
                console.log(e.target.className);
                let targetClass = e.target.className;
                let textTarget = $(`${dom} .edit-text a`);
                if(bgReg.test(targetClass)){
                    console.log("这里先待定");
                }
                if(boldReg.test(targetClass)){
                    /*textTarget.addClass("bold");*/
                    textTarget.css("font-weight","bold");
                }
                if(italicReg.test(targetClass)){
                    /*textTarget.addClass("italic");*/
                    textTarget.css("font-style","italic");
                }
                if(underReg.test(targetClass)){
                    /*textTarget.addClass("underline");*/
                    textTarget.css("text-decoration","underline");
                }
                if(rotateReg.test(targetClass)){
                    /*textTarget.addClass("rotate90");*/
                    textTarget.css("transform","rotate(90deg)");
                }
                if(centerReg.test(targetClass)){
                    /*textTarget.addClass("center");*/
                    textTarget.css("text-align","center");
                }
                if(leftReg.test(targetClass)){
                    /*textTarget.addClass("left");*/
                    textTarget.css("text-align","left");
                }
                if(linkReg.test(targetClass)){
                    console.log("暂时放放");
                }
                if(resetReg.test(targetClass)){
                    /*textTarget.addClass("resetStyle");*/
                    textTarget.css(restStyle);
                }
                e.stopPropagation();
            });
        }
    }
    /*编辑栏的下拉框改变发生的事件*/
    selectChange(dom,domChild){
        let $select = $(`${dom} ${domChild}`);
        if($select){
            if(domChild == ".edit-size"){
                $select.change((e)=>{
                    let textTarget = $(`${dom} .edit-text a`);
                    textTarget.css("font-size",`${$(e.target).val()}px`);
                    return false;
                });
            }
            if(domChild == ".family"){
                $select.change((e)=>{
                    let textTarget = $(`${dom} .edit-text a`);
                    textTarget.css("font-family",`${$(e.target).val()}`);
                    return false;
                });
            }
        }
    }
}
