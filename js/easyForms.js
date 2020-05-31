//Version 1.00
//GitHubPath: github.com/aradhya2211/easyForms
class easyForms{
    constructor(divName, NewId, Frm, title){
        this.formDiv = Frm;
        this.workingDiv = NewId;
        $('#'+divName).append('<div class="col s12 m12"><h5>'+title+'</h5></div><div id='+NewId+' class="col s12 m12"><hr></div><div id="'+NewId+'-footer" class="center-align"></div>');
        this.idData = new Array;
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

    addSelect(id, arr, varr, label, css){
        var query;
        query = '<div class="'+css+'"><div class="input-field"><select id='+id+'><option value="" disabled selected>Choose your option</option>';
        for(var i=0; i<arr.length; i++){
            query += '<option value="'+varr[i]+'">'+arr[i]+'</option>';
            }
        query += '</select><label>'+label+'</label></div></div>';
        //console.log(query);
       $('#'+this.workingDiv).append(query);
       this.addIdData(id, 'select');
       $('select').formSelect();
       return document.getElementById(id);
        }
    addArrSelect(preFixId, arrarr, arrvarr, labelArr, cssArr){
        if(typeof(cssArr)=='object'){
            for(var i = 0; i< arrarr.length; i++){
                this.addSelect(preFixId+i, arrarr[i],arrvarr[i],labelArr[i], cssArr[i]);
                }
        }
        else
        {
            for(var i = 0; i< arrarr.length; i++){
                this.addSelect(preFixId+i, arrarr[i],arrvarr[i],labelArr[i], cssArr);
                }
        }
        
    }

    addSelectMultiple(id, arr, varr, label, css){
        var query;
        query = '<div class="input-field '+css+'"><select id='+id+' multiple><option value="" disabled >Choose your option</option>';
        for(var i=0; i<arr.length; i++){
            query += '<option value="'+varr[i]+'">'+arr[i]+'</option>';
            }
        query += '</select><label>'+label+'</label></div>';
        //console.log(query);
           $('#'+this.workingDiv).append(query);
           this.addIdData(id, 'selectMulti');
           $('select').formSelect();
           return document.getElementById(id);
        }
    addTextInput(id, placeholder, type, label, css){
        var query;
        query = ' <div><div class="input-field '+css+'"><input placeholder="'+placeholder+'" id="'+id+'" type="'+type+'" class="validate"><label for="'+id+'">'+label+'</label></div>';
        //console.log(query);
        $('#'+this.workingDiv).append(query);
        this.addIdData(id, 'text');
        return document.getElementById(id);
        }
    addArrTextInput(idPreFix, placeholderArr, typeArr, labelArr, cssArr ){
            var arrID = new Array;
            for(var i = 0; i<labelArr.length; i++){
                var type, css, placeholder;
                if(typeof(typeArr) == 'object')
                type = typeArr[i];
                else
                type = typeArr;
                if(typeof(cssArr) == 'object')
                css = cssArr[i];
                else
                css = cssArr;
                typeof(placeholderArr)=='object'? placeholder = placeholderArr[i] : placeholder = placeholderArr;
                arrID[i]=this.addTextInput(idPreFix+i,placeholder, typeArr, labelArr[i],css);
            }
            return arrID;
        

    }
    addCheckbox(id, label, css){
        var query;
        query = '<div class="'+css+'"><label> <input id="'+id+'" type="checkbox" /><span>'+label+'</span></label></div>'
        $('#'+this.workingDiv).append(query);
        this.addIdData(id, 'checkbox');
        return document.getElementById(id);
    }
    addArrCheckbox(idPreFix, labelArr, cssArr){
        var retData = new Array;
        for(var i = 0; i<labelArr.length; i++){
            var css;
            css = typeof(cssArr)=='object'? cssArr[i] : cssArr;
            retData[i]=this.addCheckbox(
                idPreFix + i,
                labelArr[i],
                css
            ); 
        }
        return retData; 
    }
    addSubmitButton(id, text, icon, css){
        var query;
        query = '<div class="'+css+'"><hr><a class="waves-effect waves-light btn" id="'+id+'"><i class="material-icons right">'+icon+'</i>'+text+'</a></div>';
        $('#'+this.workingDiv+'-footer').append(query);
        return document.getElementById(id);
    }
    addDynamicButton(id,text,icon,css){
        var query;
        query = '<div class="'+css+'"><div><a class="waves-effect waves-light btn" id="'+id+'"><i class="material-icons right">'+icon+'</i>'+text+'</a></div></div>';
        $('#'+this.workingDiv).append(query);
        this.addIdData(id, 'button');
        return document.getElementById(id);
    }
    addSection(id, html, css){
        var query;
        query = '<div class ="'+css+'"><div><div id="'+id+'">'+html+'</div></div></div>';
        //console.log(query);
        $('#'+this.workingDiv).append(query);
        this.addIdData(id, 'html');
    }
    getAllData(){
        var allData = this.getId();
        //console.log(allData);
        var retObj = new Object;   
        for(var i=0; i< allData.length; i++){
            switch(allData[i].type){
                case 'checkbox':
                    retObj[allData[i].id]=document.getElementById(allData[i].id).checked;
                    break;
                case 'selectMulti':
                    var elems = document.getElementById(allData[i].id);
                    var instance = M.FormSelect.getInstance(elems);
                    retObj[allData[i].id]=instance.getSelectedValues();
                    break;
                case 'button':
                    break;
                case 'html':
                    break;
                default:
                    retObj[allData[i].id]=document.getElementById(allData[i].id).value;

            }
            //retObj[allData[i].id]=document.getElementById(allData[i].id).value;
        }
        return retObj;
    }
        
}
$(document).ready(function(){
    $('select').formSelect();
});
