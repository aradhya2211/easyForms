//Version 1.01
class easyForms{
    constructor(params){
        this.formDiv = params.form;
        this.workingDiv = params.id;
        $('#'+params.parent).append('<div class="col s12 m12"><h5>'+params.title+'</h5></div><div id='+params.id+' class="col s12 m12"><hr></div><div id="'+params.id+'-footer" class="center-align"></div>');
        this.idData = new Array;
        this.itemsInCart = new Array;
        this.delCartItemButtons = new Array;
    }
    getCart(){
        return this.itemsInCart;
    }
    removeFromCart(params){
        this.cart.splice(params.index,1);
    }
    getId(){
        return this.idData;
    }
    addIdData(name, type){
        var temp = new Object;
        temp['id'] = name;
        temp['type'] = type;
        this.idData.push(temp);
    }
    removeAllExcept(els){
        var elToBeDel = new Array;
        this.idData.forEach(function(item,index){
            if(item.id!=els){
                elToBeDel.push(item.id);
            }
        });
        for(var i = 0; i<elToBeDel.length; i++){
            this.removeEl(elToBeDel[i]);
        }
    }

    removeEl(el){
        //console.log(el +' to be removed!');
        var index = -1;
        for(var i = 0; i<this.idData.length; i++){
            if(this.idData[i].id == el){
                index = i;
            }
        }
      // console.log(index);
        if(index>=0){
            var elmnt = document.getElementById(el).parentNode.parentNode;
            elmnt.remove();
            this.idData.splice(index,1);
        }
    }
    getAllId(){
        return this.idData;
    }
    requires(obj){
       if(obj.length > 0)
        for(var i = 0; i< obj.length; i++)
            obj[i].required = true;
        else 
            obj.required = true;
            }
    addSelect(params){
        var query;
        query = '<div class="'+params.css+'"><div class="input-field"><select id='+params.id+'><option value=null disabled selected>Choose your option</option>';
        for(var i=0; i<params.options.length; i++){
            var value;
            value=params.valueArr.length>0?params.valueArr[i]:i;
            query += '<option value="'+value+'">'+params.options[i]+'</option>';
            }
        query += '</select><label>'+params.label+'</label></div></div>';
        //console.log(query);
       $('#'+this.workingDiv).append(query);
       this.addIdData(params.id, 'select');
       $('select').formSelect();
       return document.getElementById(params.id);
        }
    
    addSelectMultiple(params){
        var query;
        query = '<div class="input-field '+params.css+'"><select id='+params.id+' multiple><option value="" disabled >Choose your option</option>';
        for(var i=0; i<params.options.length; i++){
            var value;
            params.valueArr.length>0?value=params.valueArr[i]:i;
            query += '<option value="'+value+'">'+params.options[i]+'</option>';
            }
        query += '</select><label>'+params.label+'</label></div>';
           $('#'+this.workingDiv).append(query);
           this.addIdData(params.id, 'selectMulti');
           $('select').formSelect();
           return document.getElementById(params.id);
        }
    addTextInput(params){
        var query, ph;
        ph = params.placeholder==null?'':params.placeholder
        query = ' <div><div class="input-field '+params.css+'"><input placeholder="'+ph+'" id="'+params.id+'" type="'+params.type+'" class="validate"><label for="'+params.id+'">'+params.label+'</label></div>';
        //console.log(query);
        $('#'+this.workingDiv).append(query);
        this.addIdData(params.id, 'text');
        return document.getElementById(params.id);
        }
    addArrTextInput(params){
            var arrID = new Array;
            for(var i = 0; i<params.labelArr.length; i++){
                var vtype, vcss, ph;
                vtype=typeof(params.typeArr)=='object'?params.typeArr[i]:params.typeArr;
                vcss=typeof(params.css)=='object'?params.css[i]:params.css;
                ph = params.placeholder == null?'':params.placeholder.length>0?params.placeholder[i]:params.placeholder;
                
                arrID[i]=this.addTextInput({
                    id:params.id+i,
                    placeholder:ph, 
                    type : vtype, 
                    label:params.labelArr[i], 
                    css:vcss
                });
            }
            return arrID;
        

    }
    addCheckbox(params){
        var query;
        query = '<div class="'+params.css+'"><label> <input id="'+params.id+'" type="checkbox" /><span>'+params.label+'</span></label></div>'
        $('#'+this.workingDiv).append(query);
        this.addIdData(params.id, 'checkbox');
        return document.getElementById(params.id);
    }
    addArrCheckbox(params){
        var retData = new Array;
        for(var i = 0; i<params.label.length; i++){
            var vcss;
            vcss = typeof(params.css)=='object'? params.css[i] : params.css;
            retData[i]=this.addCheckbox({
                id: params.id + i,
                label: params.label[i],
                css: vcss
            }); 
        }
        return retData; 
    }
    addSubmitButton(params){
        var query;
        query = '<div class="'+params.wrapperCSS+'"><hr><a class="waves-effect waves-light btn '+params.css+'" id="'+params.id+'"><i class="material-icons right">'+params.icon+'</i>'+params.text+'</a></div>';
        $('#'+this.workingDiv+'-footer').append(query);
        return document.getElementById(params.id);
    }
    addDynamicButton(params){
        var query, parent;
        query = '<div class=""><div class="'+params.wrapperCSS+' "><a class="waves-effect waves-light btn '+params.css+'" id="'+params.id+'"><i class="material-icons right">'+params.icon+'</i>'+params.text+'</a></div></div>';
        parent = params.parent==null?this.workingDiv:params.parent;
        $('#'+parent).append(query);
        if(params.parent==null)
        this.addIdData(params.id, 'button');    
        return document.getElementById(params.id);
    }
    addSection(params){
        var query, parent;
        query = '<div class ="'+params.css+'"><div><div id="'+params.id+'">'+params.html+'</div></div></div>';
        //console.log(query);
        parent = params.parent==null?this.workingDiv:params.parent;
        //console.log(parent);
        $('#'+parent).append(query);
        if(params.parent==null)
        this.addIdData(params.id, 'html');
    }
    getCheckboxValue(id){
        return id.checked;
    }
    getSelectMultipleValues(id){
        var elems = id;
        var instance = M.FormSelect.getInstance(elems);
        return instance.getSelectedValues();
    }
    getValue(id){
        var retData;
        switch(id.type){
            case 'checkbox': 
                retData = this.getCheckboxValue(id);
                break;
            case 'select-multiple':
                retData = this.getSelectMultipleValues(id);
                break;
            default:
                retData = id.value;
        }
        return retData;

    }
    
    updateCart(params){
        var heading = params.heading;
        var desc = params.desc;
        document.getElementById(params.parent).innerHTML = '';  
        this.itemsInCart.forEach((item, i) => {
            this.addSection({
                css: params.css,
                html: '<h6>'+item[heading]+'</h6><h7>'+item[desc[0]]+'</h7><br>'+item[desc[1]],
                id: 'cart'+i,
                parent: params.parent
            });
            if(params.clearButton == true){
                this.delCartItemButtons[i] = this.addDynamicButton({
                    id:'deleteCartItem'+i,
                    css: params.clearButtonCSS,
                    icon: params.clearButtonIcon,
                    parent: 'cart'+i,
                    wrapperCSS: params.clearButtonWrapperCSS
                });
            }
        }); 
          
    }

    initbutton(item){
        item.button.onclick = function(){
            easyForms.prototype.removeFromCart({index:item.i});
        }
    }
    
    isFormComplete(){
        var allData = this.getId();
        var ret = true;
        allData.forEach(
            item => {
                var obj = document.getElementById(item.id);

                if(obj.required == true){
                    if(this.getValue(obj) == '')    
                        ret = false;
            }
        }
        );
        return ret;
    }
    getAllData(){
        var allData = this.getId();
        //console.log(allData);
        var retObj = new Object;   
        for(var i=0; i< allData.length; i++){
            switch(allData[i].type){
                
                case 'button':
                    break;
                case 'html':
                    break;
                default:
                    retObj[allData[i].id]=this.getValue(document.getElementById(allData[i].id));

            }
        }
        return retObj;
    }

    addToCart(){
        this.itemsInCart.push(this.getAllData());
        this.resetForm();
    }
    
    resetForm(){
        document.getElementById(this.formDiv).reset();
    }
    askGender(params){
        return this.addSelect(
            params.id,
            [
                'female',
                'male',
                'others',
                'Do not wish to disclose'
            ],
            [
                'female',
                'male',
                'others',
                'Do not wish to disclose'
            ],
            params.label,
            params.css
        );
    }
        
}
