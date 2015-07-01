'use strict';
// 숫자 -> 금액
function cn_toPrice(n) {
    if(isNaN(n)){return 0;}
    var reg = /(^[+-]?\d+)(\d{3})/;   
    n += '';
    while (reg.test(n))
    n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}
var videoPlayer = window.oipfObjectFactory.createVideoMpegObject();

/**
 *  Product Js : KeyEventActorProvider (키 이벤트 처리)
 **/
App.defineClass('Gigamart.app.product.KeyEventActorProvider', {
    _construct: function() {
    	var me = this;

    	me.actors = [];

        console.log("###################################################################################################################");
        console.log("############# requestProductView : " + requestProductView);
        console.log("############# requestCurrentFocusList : " + requestCurrentFocusList);
        console.log("############# requestCurrentFocusMenu : " + requestCurrentFocusMenu);
        console.log("############# requestCurrentFocusMenul : " + requestCurrentFocusMenul);
        console.log("###################################################################################################################");
        console.log("############# requestCategoryCode : " + requestCategoryCode);
        console.log("############# requestCategoryDtlCode : " + requestCategoryDtlCode);
        console.log("############# requestCategoryDtlPage : " + requestCategoryDtlPage);
        console.log("############# requestCategoryDtlId : " + requestCategoryDtlId);
        console.log("###################################################################################################################");

        //상세정보관련
        if(requestProductView != null && requestProductView != '' && requestProductView != 'undefined') {
            //2번째페이지일때
            if(requestProductView == '2'){
                //같은종류추천 
                if(requestCurrentFocusList == '2') {
                    //focus위치 가져옴 requestCurrentFocusMenu
                    productView = 2;
                    currentFocusList = 1;
                    currentFocusMenu = requestCurrentFocusMenu;
                    $('li[name="pl_menu"]').eq(requestCurrentFocusMenu).addClass('focus');  
                    $('li[name="pl_menu"]:eq('+ requestCurrentFocusMenu + ') > .pm_bdr').append(btnokfill);
                    $('li[name="pl_menu"]').eq(requestCurrentFocusMenu).children().children('.plm_tit').addClass('focus');
                }
                //다른사람이 구매한 연관상품
                else{
                    //focus위치 가져옴 requestCurrentFocusMenul
                    productView = 2;
                    currentFocusList = 0;
                    currentFocusMenul = requestCurrentFocusMenul;
                        $('li[name="pl_menul"]').eq(requestCurrentFocusMenul).addClass('focus');  
                        $('li[name="pl_menul"]:eq('+ requestCurrentFocusMenul + ') > .pm_bdr').append(btnokfill);
                        $('li[name="pl_menul"]').eq(requestCurrentFocusMenul).children().children('.plm_tit').addClass('focus');
                }     
            }else if(requestProductView == '1'){
                //같은종류추천 
                if(requestCurrentFocusList == '2') {
                    console.log("같은종류추천 #################################################################같은종류추천 ");
                    //focus위치 가져옴 requestCurrentFocusMenu
                    productView = 1;
                    currentFocusList = 2;
                    currentFocusMenu = requestCurrentFocusMenu;
                    $('li[name="pl_menu"]').eq(requestCurrentFocusMenu).addClass('focus');  
                    $('li[name="pl_menu"]:eq('+ requestCurrentFocusMenu + ') > .pm_bdr').append(btnokfill);   
                    $('li[name="pl_menu"]').eq(requestCurrentFocusMenu).children().children('.plm_tit').addClass('focus');
                }
                //다른사람이 구매한 연관상품
                else{
                    console.log("다른사람이 구매한 연관상품 ###########################################다른사람이 구매한 연관상품 ");
                    //focus위치 가져옴 requestCurrentFocusMenul
                    productView = 1;
                    currentFocusList = 3;
                    currentFocusMenul = requestCurrentFocusMenul;
                        $('li[name="pl_menul"]').eq(requestCurrentFocusMenul).addClass('focus');  
                        $('li[name="pl_menul"]:eq('+ requestCurrentFocusMenul + ') > .pm_bdr').append(btnokfill);
                        $('li[name="pl_menul"]').eq(requestCurrentFocusMenul).children().children('.plm_tit').addClass('focus');
                }  
            }
            
            
        }
        else{
            //장바구니 버튼에 focus
            $('li[name="add_cart"]').addClass('focus');
        }
        //첫번째페이지에 상세정보 관련이미지/관련정보
        this.selectProductSubCategory();


    },

    // 화면 별 키 이벤트 관련 처리
    getKeyEventActor: function (keyCode) {
    	var me = this;

        console.log("############ keyCode " + keyCode);

        // *****************************************************************************
        // * 간편 장바구니 팝업
        // *****************************************************************************
        if(isCart == true) {
            console.log("# 간편 장바구니 팝업 : " + keyCode);
            // **************************************************
            // * 三 KEY (플로팅 장바구니)
            // **************************************************
            if(keyCode == VK_GREEN) {
                isCart = false;
                $('#wrap').html(cartHtml); // 백업한 html 을 다시 복구

                /*if(currentFocusMenu >= 4) {
                    this.videoPlay("test", currentFocusMenu); // 영상 재생
                }*/

                /*if(videoPlayer.playState != 'undefined') {
                    if(videoPlayer.playState == 0 ) videoPlayer.play(1); // 영상 다시 재생
                }*/
            }
            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                
            } 

            // **************************************************
            // * 좌 우 위 아래 KEY
            // **************************************************
            else if (keyCode >= global.VK_LEFT && keyCode <= global.VK_DOWN) {
                // **************************************************
                // * 위 KEY
                // **************************************************
                if(keyCode === global.VK_UP) {
                    
                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {

                }

                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {
                    
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {

                }
                
            } else if (keyCode === global.VK_BACK) {
                isCart = false;
                $('#wrap').html(cartHtml); // 백업한 html 을 다시 복구
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                
            }
        }

        // *****************************************************************************
        // * 팝업 없을 때
        // *****************************************************************************
        else if(isCart == false) {
            // **************************************************
            // * 三 KEY (간편 장바구니)
            // **************************************************
            if(keyCode == VK_GREEN) {

                if(currentFocusMenu >= 4) {
                    this.videoStop(); // 영상 재생 중지
                }
                /*if(videoPlayer.playState != 'undefined') {
                    if(videoPlayer.playState != 0 ) this.videoStop(); // 영상 재생 중지
                }
*/
                isCart = true;
                cartHtml = $('#wrap').html(); // 간편 장바구니에 들어갈 부분의 html 백업 (간편 장바구니 해제 후에 다시 돌려두어야함)
                $('#wrap').load("easy_cart.html");
                $('#ecc_payments').addClass('focus');
            }

            // **************************************************
            // * ◀ KEY (플로팅 Go home)
            // **************************************************
            if(keyCode == VK_RED) {
                location.href ="exhb.html" ; // 기획전 이동
            }
            // **************************************************
            // * ◀|| KEY (카테고리 Go home)
            // 
            if(keyCode == VK_PLAY) {
                location.href ="category.html"; // 기획전 이동
            }    
            // **************************************************
            // * 확인 KEY
            // **************************************************
            if (keyCode === global.VK_ENTER) {
                //상품정보의 첫번째 화면일때
                if(productView ==1){
                    if(currentFocusList == 0) {
                        if(btFocus == 0) { //+/-일때 popup
                            var num = Number($('span[name="pr_num_num"]').html());
                            currentFocusList = 4;
                            $('span[name="pr_num_minus"]').removeClass('focus'); 
                            $('span[name="pr_num_plus"]').removeClass('focus'); 
                            popFocus = 1;
                            $('div[name="wrap_chVolume"]').show();
                            $('span[name="pr_num_numP"]').html(num);
                            $('span[name="pr_num_plusP"]').addClass('focus'); 


                            /*// -에 포커스일때
                            if(pFocus == 0){
                                currentFocusList = 4;
                                popFocus = 0;
                                $('span[name="pr_num_minus"]').removeClass('focus'); 
                                $('div[name="wrap_chVolume"]').show();
                                $('span[name="pr_num_numP"]').html(num);
                                $('span[name="pr_num_minusP"]').addClass('focus'); 
                            }
                            // +에 포커스일때
                            else{
                                currentFocusList = 4;
                                popFocus = 1;
                                $('span[name="pr_num_plus"]').removeClass('focus'); 
                                $('div[name="wrap_chVolume"]').show();
                                $('span[name="pr_num_numP"]').html(num);
                                $('span[name="pr_num_plusP"]').addClass('focus'); 
                                
                            } */  
                           
                        }
                    }
                    else if(currentFocusList == 1){

                    }
                    else if(currentFocusList == 2){

                    }
                    else if(currentFocusList == 3){

                    }
                    //팝업
                    else if(currentFocusList == 4) {
                        //-에 포커스일때
                        if(popFocus == 0){
                            var num = Number($('span[name="pr_num_num"]').html());
                            var numP = Number($('span[name="pr_num_numP"]').html());
                            if(numP > 1){
                                numP = numP - 1;
                                $('span[name="pr_num_numP"]').html(numP);
                            }else if(numP == 1){

                            }
                        }
                        //+에 포커스일때
                        else if(popFocus == 1){
                            var num = Number($('span[name="pr_num_num"]').html());
                            var numP = Number($('span[name="pr_num_numP"]').html());
                            if(numP == 1 || numP>1){
                                numP = numP + 1;
                                $('span[name="pr_num_numP"]').html(numP);
                            }else{

                            }
                        }
                        //확인에 포커스일때
                        else if(popFocus == 2){
                            $('span[id="btn_ok"]').removeClass('focus');
                            var numP = Number($('span[name="pr_num_numP"]').html());
                            $('span[name="pr_num_num"]').html(numP);

                            currentFocusList = 0;
                            pFocus = pFocus;
                            $('span[name="pr_num_minus"]').addClass('focus');
                            $('span[name="pr_num_plus"]').addClass('focus');
                            /*if(pFocus == 0){
                                //팝업전화면에서 pFocus포커스가 - 였을때
                                $('span[name="pr_num_minus"]').addClass('focus');
                            }else{
                                //팝업전화면에서 pFocus포커스가 + 였을때
                                $('span[name="pr_num_plus"]').addClass('focus');
                            }*/
                            
                            $('div[name="wrap_chVolume"]').hide();


                        }
                        //취소에 포커스일때
                        else if(popFocus == 3){
                            $('span[id="btn_close"]').removeClass('focus'); 
                            console.log("pFocus==>"+pFocus);
                            currentFocusList = 0;
                            pFocus = pFocus;
                            $('span[name="pr_num_minus"]').addClass('focus');
                            $('span[name="pr_num_plus"]').addClass('focus');
                            /*if(pFocus == 0){
                                //팝업전화면에서 pFocus포커스가 - 였을때
                                $('span[name="pr_num_minus"]').addClass('focus');
                            }else{
                                //팝업전화면에서 pFocus포커스가 + 였을때
                                $('span[name="pr_num_plus"]').addClass('focus');
                            }*/
                            
                            $('div[name="wrap_chVolume"]').hide();
                        }
                    }
                }
                //상품정보의 두번째 화면일때
                else{
                    //기획전일때->exhb.html으로 이동
                    if(currentFocusList == 2) {
                        location.href ="exhb.html" ; // 기획전 이동
                    }   
                }
            } 

            // **************************************************
            // * 좌 우 위 아래 KEY
            // **************************************************
            else if (keyCode >= global.VK_LEFT && keyCode <= global.VK_DOWN) {
                // **************************************************
                // * 위 KEY
                // **************************************************
                if(keyCode === global.VK_UP) {
                    //상품정보의 첫번째 화면일때
                    if(productView ==1){
                        console.log("currentFocusList==>"+currentFocusList);
                        // 장바구니 찜하기 상세보기 버튼들..
                        if(currentFocusList == 0) {
                            if(btFocus == 2) { //찜하기 focus일때
                                console.log("btFocus131313==>"+btFocus);
                                $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                btFocus = Number(btFocus) + 1;
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                            }
                        }
                        //상품정보 전체화면
                        else if(currentFocusList == 1) {
                            
                        }
                        // 상품정보 같은종류 추천상품
                        else if(currentFocusList == 2) {
                            
                        }  
                        //상품정보 다른사람이 구매한 연관상품
                        else if(currentFocusList == 3) {
                            if(currentFocusMenul == 0){//다른사람이 구매한 연관상품->+ focus
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                
                                $('span[name="pr_num_plus"]').addClass('focus');
                                $('span[name="pr_num_minus"]').addClass('focus'); 
                                /*if(pFocus == 1){
                                    $('span[name="pr_num_plus"]').addClass('focus');
                                }else{
                                    $('span[name="pr_num_minus"]').addClass('focus'); 
                                } */   
                                currentFocusList = 0;
                                //currentFocusMenul = currentFocusMenul-1;
                            }
                            else if(currentFocusMenul == 1){//다른사람이 구매한 연관상품 -> 장바구니담기 focus
                                console.log("다른사람이 구매한 연관상품 -> 장바구니담기 focus currentFocusMenul==>"+currentFocusMenul);    
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                currentFocusList = 0;
                                //currentFocusMenul = currentFocusMenul-1;
                            }
                            else if(currentFocusMenul == 2){//다른사람이 구매한 연관상품 -> 찜하기 focus
                                console.log("다른사람이 구매한 연관상품 -> 찜하기 focus currentFocusMenul==>"+currentFocusMenul);  
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                currentFocusList = 0;
                                //currentFocusMenul = currentFocusMenul-1;
                            }
                        }    
                        //팝업
                        else if(currentFocusList == 4) {
                            //확인버튼에 포커스
                            if(popFocus == 2){
                                console.log("확인버튼에 포커스"); 
                                $('span[id="btn_ok"]').removeClass('focus'); 
                                popFocus = 0;
                                $('span[name="pr_num_minusP"]').addClass('focus'); 
                            }
                            //취소버튼에 포커스
                            else if(popFocus == 3){
                                console.log("취소버튼에 포커스"); 
                                $('span[id="btn_close"]').removeClass('focus'); 
                                popFocus = 1;
                                $('span[name="pr_num_plusP"]').addClass('focus');
                            }
                        }

                    }
                    //상품정보의 두번째 화면일때
                    else{
                        // 다른사람이 구매한 연관상품->첫번째페이지
                        if(currentFocusList == 0) {
                            productView = 1;
                            $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                            $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                            $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                            currentFocusList = 3;
                            currentFocusMenul = currentFocusMenul;
                            var url = "&categoryCode=" + requestCategoryCode
                            + "&categoryDtlCode=" + requestCategoryDtlCode
                            + "&categoryDtlPage=" + requestCategoryDtlPage
                            + "&id=" + requestCategoryDtlId;
                            location.href="product1.html?productView="+productView+"&currentFocusList="+currentFocusList+"&currentFocusMenul="+currentFocusMenul+url;
                        }
                        // 같은종류 추천상품->첫번째페이지
                        else if(currentFocusList == 1){
                            productView = 1;
                            $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                            currentFocusList = 2;
                            currentFocusMenu = currentFocusMenu;
                            var url = "&categoryCode=" + requestCategoryCode
                            + "&categoryDtlCode=" + requestCategoryDtlCode
                            + "&categoryDtlPage=" + requestCategoryDtlPage
                            + "&id=" + requestCategoryDtlId;
                            location.href="product1.html?productView="+productView+"&currentFocusList="+currentFocusList+"&currentFocusMenu="+currentFocusMenu+url;
                        }
                        //관련기획전->같은종류 추천상퓸/다른사람이 구매한 연관상품
                        else if(currentFocusList == 2){
                            //관련기획전->같은종류 추천상품
                            if(giFocus == 0){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');   
                                currentFocusList = 1;        
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            //관련기획전->다른사람이 구매한 연관상품
                            else if(giFocus == 1){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');   
                                currentFocusList = 0;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            else if(giFocus == 2){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus = 0;  
                                $('li[name="relP"]').eq(giFocus).addClass('focus'); 
                            }
                            else if(giFocus == 3){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');   
                                giFocus = 1;  
                                $('li[name="relP"]').eq(giFocus).addClass('focus'); 
                            }
                        }

                    }



                }

                // **************************************************
                // * 아래 KEY
                // **************************************************
                if(keyCode === global.VK_DOWN) {
                       //상품정보의 첫번째 화면일때
                       if(productView ==1){
                           // 장바구니 찜하기 상세보기 버튼들..
                            if(currentFocusList == 0) {
                                if(btFocus  == 0){ //+/- focus -> 다른사람이 구매한 연관상품
                                    //$('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                    /*if(pFocus == 1){
                                        $('span[name="pr_num_plus"]').removeClass('focus');
                                    }else{
                                        $('span[name="pr_num_minus"]').removeClass('focus'); 
                                    } */
                                    $('span[name="pr_num_plus"]').removeClass('focus');
                                    $('span[name="pr_num_minus"]').removeClass('focus'); 

                                    $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();  
                                    $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');  
                                    currentFocusMenul = 0;
                                    currentFocusList = 3;
                                    console.log("currentFocusList!!!==>"+currentFocusList);
                                    $('li[name="pl_menul"]').eq(btFocus).addClass('focus');     
                                    $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                    $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');    
                                }
                                else if(btFocus  == 1){//장바구니 담기focus -> 다른사람이 구매한 연관상품
                                    $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                    $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                    console.log("장바구니 담기focus -> 다른사람이 구매한 연관상품 currentFocusMenul111==>"+currentFocusMenul);  
                                    currentFocusMenul = btFocus;
                                    currentFocusList = 3;
                                    console.log("장바구니 담기focus -> 다른사람이 구매한 연관상품 currentFocusMenul222==>"+currentFocusMenul);  
                                    $('li[name="pl_menul"]').eq(btFocus).addClass('focus'); 
                                    $('li[name="pl_menul"]:eq('+ btFocus + ') > .pm_bdr').append(btnokfill);   
                                    $('li[name="pl_menul"]').eq(btFocus).children().children('.plm_tit').addClass('focus');  
                                }
                                else if(btFocus  == 2){//찜하기 focus -> 다른사람이 구매한 연관상품
                                    $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                    $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                    console.log("찜하기 focus -> 다른사람이 구매한 연관상품 currentFocusMenul111==>"+currentFocusMenul);  
                                    currentFocusMenul = btFocus;
                                    currentFocusList =3;
                                    console.log("찜하기 focus -> 다른사람이 구매한 연관상품 currentFocusMenul222==>"+currentFocusMenul);  
                                    $('li[name="pl_menul"]').eq(btFocus).addClass('focus');  
                                    $('li[name="pl_menul"]:eq('+ btFocus + ') > .pm_bdr').append(btnokfill);   
                                    $('li[name="pl_menul"]').eq(btFocus).children().children('.plm_tit').addClass('focus');
                                }
                                else if(btFocus  == 3) { //상세보기 focus일때
                                    console.log("btFocus111==>"+btFocus);
                                    $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                    btFocus = Number(btFocus) - 1;
                                    console.log("btFocus222==>"+btFocus);
                                    $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                }
                            }

                           // 상품정보 전체화면
                           else if(currentFocusList == 1) {
                                
                           }

                           // 같은종류 추천상품
                           else if(currentFocusList == 2) {
                                productView = 2;
                                //상품정보의 두번째화면으로 이동   
                                console.log("같은종류 추천상품 상품정보의 두번째화면으로 이동 ");
                                console.log("currentFocusList==>"+currentFocusList+" , currentFocusMenu==>"+currentFocusMenu);
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusList = currentFocusList;
                                currentFocusMenu = currentFocusMenu;
                                var url = "&categoryCode=" + requestCategoryCode
                                + "&categoryDtlCode=" + requestCategoryDtlCode
                                + "&categoryDtlPage=" + requestCategoryDtlPage
                                + "&id=" + requestCategoryDtlId;
                                location.href="product2.html?productView="+productView+"&currentFocusList="+currentFocusList+"&currentFocusMenu="+currentFocusMenu+url;
                                
                            }

                             //다른사람이 구매한 연관상품
                            else if(currentFocusList == 3) {
                                productView = 2;
                                //상품정보의 두번째화면으로 이동   
                                console.log("다른사람이 구매한 연관상품 상품정보의 두번째화면으로 이동 ");
                                console.log("currentFocusList==>"+currentFocusList+" , currentFocusMenul==>"+currentFocusMenul);
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusList = currentFocusList;
                                currentFocusMenul = currentFocusMenul;
                                //location.href="product2.html"
                                var url = "&categoryCode=" + requestCategoryCode
                                + "&categoryDtlCode=" + requestCategoryDtlCode
                                + "&categoryDtlPage=" + requestCategoryDtlPage
                                + "&id=" + requestCategoryDtlId;
                                location.href="product2.html?productView="+productView+"&currentFocusList="+currentFocusList+"&currentFocusMenul="+currentFocusMenul+url;
                            }
                            //팝업
                            else if(currentFocusList == 4) {
                                //-에 focus일떄->확인
                                if(popFocus == 0){
                                    $('span[name="pr_num_minusP"]').removeClass('focus');
                                    popFocus = 2;   
                                    $('span[id="btn_ok"]').addClass('focus'); 
                                    console.log("-에 focus일떄->확인 popFocus->"+popFocus);
                                }
                                //+에 focus일때->취소
                                else if(popFocus == 1){
                                    $('span[name="pr_num_plusP"]').removeClass('focus'); 
                                    popFocus = 3;
                                    $('span[id="btn_close"]').addClass('focus'); 
                                    console.log("+에 focus일때->취소->"+popFocus);
                                }
                            }
                    }   
                    //상품정보의 두번째 화면일때
                    else{
                        //다른사람이 구매한 연관상품->기획전
                        if(currentFocusList == 0) {
                            currentFocusList = 2;
                            giFocus = 1;
                            $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                            $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                            $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                            $('li[name="relP"]').eq(giFocus).addClass('focus');   

                        }
                        //같은종류 추천상품->기획전
                        else if(currentFocusList == 1){
                            currentFocusList = 2;
                            giFocus = 0;
                            $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                            $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                            $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                            $('li[name="relP"]').eq(giFocus).addClass('focus');   

                        }
                        //관련기획전
                        else if(currentFocusList == 2){
                            //관련기획전 1행1번째->2행1번째
                            if(giFocus == 0){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');  
                                giFocus = 2;
                                $('li[name="relP"]').eq(giFocus).addClass('focus');      
                            }
                            //관련기획전 1행2번째->2행2번째
                            else if(giFocus == 1){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus');  
                                giFocus = 3;
                                $('li[name="relP"]').eq(giFocus).addClass('focus');  
                            }
                        }           
                    } 


                }
                // **************************************************
                // * 좌 KEY
                // **************************************************
                if(keyCode === global.VK_LEFT) {
                    //상품정보의 첫번째 화면일때
                    if(productView ==1){
                        // 장바구니 찜하기 상세보기 버튼들..
                        if(currentFocusList == 0) {
                            if(btFocus  == 0) { // +/- focus일때
                                /*if(pFocus == 1){ //+에 focus
                                    $('span[name="pr_num_plus"]').removeClass('focus');
                                    pFocus = Number(pFocus) - 1;
                                    $('span[name="pr_num_minus"]').addClass('focus'); 
                                }*/
                            }
                            if(btFocus  == 1) { //장바구니담기 focus일때
                               $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                               btFocus = Number(btFocus) - 1;
                               $('span[name="pr_num_plus"]').addClass('focus'); //+에 focus
                               $('span[name="pr_num_minus"]').addClass('focus'); //-에 focus
                            }
                            if(btFocus  == 2) { //찜하기 focus일때
                                $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                btFocus = Number(btFocus) - 1;
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                            }
                        }

                        // 상품정보 전체화면
                        else if(currentFocusList == 1) {
                            /*$('li[name="li_discount2"]').eq(currentFocusDtl2).removeClass('focus');
                            $('li[name="li_discount2"]:eq('+ currentFocusDtl2 + ') > .dm_bdr').empty();
                            currentFocusList = 0;
                            currentFocusDtl1 = currentFocusDtl2; // 열2 선택 순서가 그대로 열1으로 이동
                            $('li[name="li_discount1"]').eq(currentFocusDtl1).addClass('focus');
                            $('li[name="li_discount1"]:eq('+ currentFocusDtl1 + ') > .dm_bdr').append(btnokfill);*/
                        }

                        // 같은종류 추천상품
                        else if(currentFocusList == 2) {
                            if(currentFocusMenu == 1){//같은종류 추천상품2번째->1번째
                                console.log("같은종류 추천상품2번째->1번째 focus currentFocusMenu==>"+currentFocusMenu);  
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)-1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenu == 2){//같은종류 추천상품3번째->2번째
                                console.log("같은종류 추천상품3번째->2번째 focus currentFocusMenu==>"+currentFocusMenu); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)-1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                        }

                        //다른사람이 구매한 연관상품 
                        else if(currentFocusList == 3) {
                            console.log("LEFT");
                            console.log("currentFocusMenul==>"+currentFocusMenul); 
                            if(currentFocusMenul == 0){//다른사람이 구매한 연관상품1번째->같은종류 추천상품3번째
                                console.log("다른사람이 구매한 연관상품1번째->같은종류 추천상품3번째 currentFocusMenul==>"+currentFocusMenul);  
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = 2;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                                currentFocusList = 2;
                            }
                            else if(currentFocusMenul == 1){//다른사람이 구매한 연관상품2번째->1번째
                                console.log("다른사람이 구매한 연관상품2번째 focus currentFocusMenul==>"+currentFocusMenul);  
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)-1;
                                btFocus = currentFocusMenul
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenul == 2){//다른사람이 구매한 연관상품3번째->2번째
                                console.log("다른사람이 구매한 연관상품3번째 focus currentFocusMenul==>"+currentFocusMenul); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)-1;
                                btFocus = currentFocusMenul
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                        } 
                        //팝업
                        else if(currentFocusList == 4) {
                            //+일때-> -
                            if(popFocus == 1){
                                $('span[name="pr_num_plusP"]').removeClass('focus'); 
                                popFocus = 0;
                                $('span[name="pr_num_minusP"]').addClass('focus'); 
                            }
                            //취소 -> 확인
                            else if(popFocus == 3){
                                $('span[id="btn_close"]').removeClass('focus');
                                popFocus = 2;
                                $('span[id="btn_ok"]').addClass('focus');
                            }

                        }


                    }
                    //상품정보의 두번째 화면일때
                    else{
                        //다른사람이 구매한 연관상품
                        if(currentFocusList == 0) {
                            //다른사람이 구매한 연관상품1번째->같은종류 추천상품 3번째
                            if(currentFocusMenul ==0){
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = 2;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill);
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus'); 
                                currentFocusList = 1;
                            }
                            //다른사람이 구매한 연관상품2번째->다른사람이 구매한 연관상품 1번째
                            else if(currentFocusMenul ==1){
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)-1;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenul == 2){
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)-1;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');

                            }
                        }
                        //같은종류 추천상품
                        else if(currentFocusList == 1){
                            //같은종류 추천상품2번째->같은종류 추천상품 1번째
                            if(currentFocusMenu ==1){
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)-1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            //같은종류 추천상품3번째->같은종류 추천상품 2번째
                            else if(currentFocusMenu == 2){
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)-1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                        }
                        //관련기획전
                        else if(currentFocusList == 2){
                             //1행2번째->1행1번째
                            if(giFocus ==1){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus=0;   
                                $('li[name="relP"]').eq(giFocus).addClass('focus'); 
                            }
                             //2행2번째->2행1번째
                            else if(giFocus ==3){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus=2;   
                                $('li[name="relP"]').eq(giFocus).addClass('focus');     
                            }
                        }

                    }   
                }

                // **************************************************
                // * 우 KEY
                // **************************************************
                if(keyCode === global.VK_RIGHT) {

                    //상품정보의 첫번째 화면일때
                    if(productView ==1){
                        // 장바구니 찜하기 상세보기 버튼들..
                        if(currentFocusList == 0) {
                            if(btFocus  == 0) { // +/- focus일때
                                $('span[name="pr_num_plus"]').removeClass('focus');
                                $('span[name="pr_num_minus"]').removeClass('focus');
                                btFocus = Number(btFocus + 1);
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                /*
                                if(pFocus == 1){ //+에 focus
                                    $('span[name="pr_num_plus"]').removeClass('focus');
                                    btFocus = Number(btFocus + 1);
                                    console.log("btFocus2424==>"+btFocus);
                                    $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                                }else{ //-에 focus
                                    $('span[name="pr_num_minus"]').removeClass('focus');
                                    pFocus = pFocus + 1;
                                    $('span[name="pr_num_plus"]').addClass('focus');
                                }*/
                            }
                            else if(btFocus  == 1) { //장바구니담기 focus일때
                                console.log("btFocus@==>"+btFocus);
                                $('ul[name="ci_btn"]').children().eq(btFocus).removeClass('focus');
                                btFocus = Number(btFocus) + 1;
                                console.log("btFocus@@==>"+btFocus);
                                $('ul[name="ci_btn"]').children().eq(btFocus).addClass('focus');
                            }
                        }
                        // 상품정보 전체화면
                        else if(currentFocusList == 1){

                        }
                        // 같은종류 추천상품
                        else if(currentFocusList == 2){
                            if(currentFocusMenu == 0){//같은종류 추천상품1번째->2번째
                                console.log("같은종류 추천상품1번째->2번째 focus currentFocusMenu==>"+currentFocusMenu);  
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu+1);
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenu == 1){//같은종류 추천상품2번째->3번째
                                console.log("같은종류 추천상품2번째->3번째 focus currentFocusMenu==>"+currentFocusMenu); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)+1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            } 
                            else if(currentFocusMenu == 2){//같은종류 추천상품3번째->다른사람이 구매한 연관상품 1번째
                                console.log("같은종류 추천상품3번째->다른사람이 구매한 연관상품 1번째==>"+currentFocusMenu); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus');   
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul =0;
                                currentFocusList = 3;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                                
                            } 


                        }
                        // 다른사람이 구매한 연관상품
                        else if(currentFocusList == 3){
                            console.log("Right");
                            console.log("currentFocusMenulRight==>"+currentFocusMenul); 
                            if(currentFocusMenul == 0){//다른사람이 구매한 연관상품1번째->2번째
                                console.log("다른사람이 구매한 연관상품1번째 focus currentFocusMenul==>"+currentFocusMenul);  

                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)+1;
                                btFocus = currentFocusMenul
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            else if(currentFocusMenul == 1){//다른사람이 구매한 연관상품2번째->3번째
                                console.log("다른사람이 구매한 연관상품2번째 focus currentFocusMenul==>"+currentFocusMenul); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus');   
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)+1;
                                btFocus = currentFocusMenul
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }    
                        }
                        //팝업
                        else if(currentFocusList == 4) {
                            //-일때-> +
                            if(popFocus == 0){
                                $('span[name="pr_num_minusP"]').removeClass('focus'); 
                                popFocus = 1;
                                $('span[name="pr_num_plusP"]').addClass('focus'); 
                            }
                            //확인 -> 취소
                            else if(popFocus == 2){
                                $('span[id="btn_ok"]').removeClass('focus');
                                popFocus = 3;
                                $('span[id="btn_close"]').addClass('focus');
                            }

                        }


                    }
                    //상품정보의 두번째 화면일때
                    else{
                        //다른사람이 구매한 연관상품
                        if(currentFocusList == 0) {
                            console.log("#############RIGHTRIGHT다른사람이 구매한 연관상품RIGHT#########################"); 
                            //다른사람이 구매한 연관상품1번째->다른사람이 구매한 연관상품 2번째
                            if(currentFocusMenul ==0){
                                console.log("#############다른사람1번째->다른사람 2번째#########################currentFocusMenul>>"+currentFocusMenul); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)+1;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                            //다른사람이 구매한 연관상품2번째->다른사람이 구매한 연관상품 3번째
                            else if(currentFocusMenul == 1){
                                console.log("#############다른사람2번째->다른사람 3번째#########################currentFocusMenul111>>"+currentFocusMenul);
                                $('li[name="pl_menul"]').eq(currentFocusMenul).removeClass('focus'); 
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').empty();
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenul = Number(currentFocusMenul)+1;
                                console.log("#############다른사람2번째->다른사람 3번째#########################currentFocusMenul222>>"+currentFocusMenul);
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                            }
                        }
                        //같은종류 추천상품
                        else if(currentFocusList == 1){
                            console.log("#############RIGHTRIGHT같은종류 추천상품RIGHT#########################"); 
                            //같은종류 추천상품1번째->같은종류 추천상품 2번째
                            if(currentFocusMenu ==0){
                                console.log("#############같은종류 추천상품1번째->같은종류 추천상품 2번째#########################currentFocusMenu>>"+currentFocusMenu); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)+1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            //같은종류 추천상품2번째->같은종류 추천상품 3번째
                            else if(currentFocusMenu ==1){
                                console.log("#############같은종류 추천상품2번째->같은종류 추천상품 3번째#########################currentFocusMenu>>"+currentFocusMenu);
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                currentFocusMenu = Number(currentFocusMenu)+1;
                                $('li[name="pl_menu"]').eq(currentFocusMenu).addClass('focus');  
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').append(btnokfill); 
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').addClass('focus');
                            }
                            //같은종류 추천상품3번째->다른사람이 구매한 연관상품 추천상품 1번째
                            else if(currentFocusMenu ==2){
                                console.log("#############같은종류 추천상품3번째->다른사람이 구매한 연관상품 추천상품 1번째#########################");
                                $('li[name="pl_menu"]').eq(currentFocusMenu).removeClass('focus'); 
                                $('li[name="pl_menu"]:eq('+ currentFocusMenu + ') > .pm_bdr').empty();
                                $('li[name="pl_menu"]').eq(currentFocusMenu).children().children('.plm_tit').removeClass('focus');
                                //currentFocusMenu = currentFocusMenu+1;
                                currentFocusMenul =0;
                                $('li[name="pl_menul"]').eq(currentFocusMenul).addClass('focus');  
                                $('li[name="pl_menul"]:eq('+ currentFocusMenul + ') > .pm_bdr').append(btnokfill);
                                $('li[name="pl_menul"]').eq(currentFocusMenul).children().children('.plm_tit').addClass('focus');
                                currentFocusList = 0; 
                            }

                        }
                        //관련기획전
                        else if(currentFocusList == 2){
                            //1행1번째->1행2번째
                            if(giFocus ==0){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus=1;   
                                $('li[name="relP"]').eq(giFocus).addClass('focus'); 
                            }
                             //2행1번째->2행2번째
                            else if(giFocus ==2){
                                $('li[name="relP"]').eq(giFocus).removeClass('focus'); 
                                giFocus=3;   
                                $('li[name="relP"]').eq(giFocus).addClass('focus');     
                            }
                        }

                    }
                    
                }
                console.log("* getKeyEventActor : " + keyCode );
                console.log("리스트 종류 : " + currentFocusList);
                console.log("전체카테고리 : " + currentFocusMenu);
                console.log("상세카테고리 페이지 : " + currentFocusDtlPage);
                console.log("상세카테고리 : " + currentFocusDtl);
                
                
            } else if (keyCode === global.VK_BACK) {
                if(requestCategoryCode  == null || requestCategoryCode  == '' || requestCategoryCode  == 'undefined') {
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%기획전으로 이동");
                    location.href ="exhb.html" ; // 기획전 이동
                }else{
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%전체 카테고리로 이동");
                    // 전체 카테고리로 이동
                    //this.transCategoryCode(); // 한글코드를 숫자코드로 변환 후 페이지 이동
                    location.href = "category_dtl.html?categoryCode=" + requestCategoryCode + "&categoryDtlCode=" + requestCategoryDtlCode + "&categoryDtlPage=" + requestCategoryDtlPage;
                
                }
                
                
            } else if (keyCode === global.VK_ESCAPE) {
                
            } else if (keyCode === global.VK_PLAY || keyCode === global.VK_STOP || keyCode === global.VK_REWIND || keyCode === global.VK_FAST_FWD) {
                
            }
        }
    },

    // 영상재생
    videoPlay: function(url, category) {
        // 테스트용 영상
        url = "http://14.52.244.91:8080/video/tv/category/" + (category - 3) + ".mp4";
        // 테스트용 이미지 덧붙이기 (현재 로딩중에 이미지 덧붙이기 안됨)
        $('#videoDiv').empty().append('<img src="../images/sample_01.jpg" />');
        
        videoPlayer.width = 704;
        videoPlayer.height = 396;
        $('#videoDiv').empty()
        document.getElementById('videoDiv').appendChild(videoPlayer);
        videoPlayer.data = url;
        videoPlayer.play(1);
    },

    // 영상 정지
    videoStop: function() {
        try {
             if(videoPlayer.playState != 0 ) {
                  videoPlayer.stop();
             }
        } catch(err){
             alert("Video stop " + err);
        }
    },
    
    // 화면 이동 시 메뉴 갱신
    menuRefresh: function() {
        var appendHtml = "";

        // 쇼퍼's Bag
        if(currentFocusMenu == '3') {

        } 

        if(currentFocusMenu == '4' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>사과/배</li>";
            appendHtml += "<li name='appendMenu'>참외/토마토</li>";
            appendHtml += "<li name='appendMenu'>키위/딸기/멜론/수박</li>";
            appendHtml += "<li name='appendMenu'>귤/한라봉/천혜향</li>";
            appendHtml += "<li name='appendMenu'>바나나/오렌지/외국과일</li>";
            appendHtml += "<li name='appendMenu'>복분자/블루베리</li>";
            appendHtml += "<li name='appendMenu'>건과/견과</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        } 

        if(currentFocusMenu == '5' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>고구마/감자/호박</li>";
            appendHtml += "<li name='appendMenu'>파/양파/마늘/생강</li>";
            appendHtml += "<li name='appendMenu'>당근/오이/가지/고추</li>";
            appendHtml += "<li name='appendMenu'>배추/양배추/무</li>";
            appendHtml += "<li name='appendMenu'>쌈 채소/기타</li>";
            appendHtml += "<li name='appendMenu'>파프리카/피망</li>";
            appendHtml += "<li name='appendMenu'>표고/송이/버섯류</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = true; // 하위페이지 있음
        }

        if(currentFocusMenu == '5' && currentFocusDtlPage == '1') {
            appendHtml += "<li name='appendMenu'>나물류/새순</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = true; // 이전페이지 있음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '6' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>우유</li>";
            appendHtml += "<li name='appendMenu'>두유</li>";
            appendHtml += "<li name='appendMenu'>요구르트</li>";
            appendHtml += "<li name='appendMenu'>버터/치즈/마가린</li>";
            appendHtml += "<li name='appendMenu'>두부</li>";
            appendHtml += "<li name='appendMenu'>계란/메추리알</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '7' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>소고기</li>";
            appendHtml += "<li name='appendMenu'>돼지고기</li>";
            appendHtml += "<li name='appendMenu'>닭/오리</li>";
            appendHtml += "<li name='appendMenu'>양념육/육포</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '8' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>생선/해산물</li>";
            appendHtml += "<li name='appendMenu'>멸치/건새우/건어</li>";
            appendHtml += "<li name='appendMenu'>미역/김/해조류</li>";
            appendHtml += "<li name='appendMenu'>어포/안주류</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '9' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>쌀</li>";
            appendHtml += "<li name='appendMenu'>찹쌀/현미</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '10' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>홍삼/건강식품</li>";
            appendHtml += "<li name='appendMenu'>친환경/유기농샵</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            appendHtml += "<li>&nbsp;</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }

        if(currentFocusMenu == '11' && currentFocusDtlPage == '0') {
            appendHtml += "<li name='appendMenu'>즉석/간편식/햄/통조림</li>";
            appendHtml += "<li name='appendMenu'>라면/국수/면류</li>";
            appendHtml += "<li name='appendMenu'>생수/커피/차/음료</li>";
            appendHtml += "<li name='appendMenu'>조미료/향신료/장류</li>";
            appendHtml += "<li name='appendMenu'>과자</li>";
            appendHtml += "<li name='appendMenu'>사탕/초콜릿/껌</li>";
            appendHtml += "<li name='appendMenu'>빵/식빵/케익/잼</li>";
            $('#cc_list').empty().append(appendHtml);
            prevPageYN = false; // 이전페이지 없음
            nextPageYN = false; // 하위페이지 없음
        }
    },

    addKeyEventActor: function (instance, conditionFunction) {
    	this.actors.push({
    		instance: instance,
    		conditionFunction: conditionFunction
    	});
    },
    // 조회 : 상세카테고리별 상품정보
    selectProductSubCategory: function() {
        var param = {
                        "subcategory" : requestCategoryDtlCode
                    };
        $.ajax({
            url         : cmsServerIp + "/ProductSubCategoryTask",
            type        : "post",
            dataType    : "json",
            data        : param,
            async       : true,
            xhrFields   : {
                            withCredentials: true
            },
            success     : function(result) {
                /*console.log("######## 상세카테고리 파라미터 : " + requestCategoryDtlCode);*/
                console.log("######################################################################");
                console.log("######## 상품목록 결과 개수 : " + result.length);
                console.log("######## result  : " + result);
                console.log("######################################################################");

                //resultSet = result;

                // 결과값이 9보다 크면 ul > li 9개만 세팅
                /*if(result.length > 9) {
                    for(var i=0 ; i < 9 ; i++) {
                        makeProduct();
                    }
                } 
                // 결과값이 9보다 작으면 result 갯수만큼 뿌려줌
                else {
                    for(var i=0 ; i < result.length ; i++) {
                        makeProduct();
                    }
                }*/
                // 결과값을 넣는다.
                $.each(result, function(index, entry) {
                    // 처음에 뿌려주는 9개만 넣는다.
                    if(entry['id'] == requestCategoryDtlId) {
                        console.log("######## entry[id]와 request값 같은때 ########");
                        console.log("######## result  : " + JSON.stringify(result));
                        $('li[name="cl_photo"]').append('<img src="' + cmsServerIp + entry['img'] + '"  style="height : 302px; display : block; margin : 0 auto; "/>'); //width :555px;
                        $('span[name="pd_name"]').append(entry['name']);
                        $('span[name="pd_cost"]').append(cn_toPrice(entry['cost']) + "원");
                        $('span[name="pd_origin"]').append(entry['origin']);
                        $('span[name="pd_company"]').append(entry['company']);
                        $('span[name="pd_standard"]').append(entry['standard']);
                    }
                });

                // 리스트에 뿌려주는건 9개씩 따로 해줌

            },
            error : function(){
                    console.log("에러");
            }
        });
    }



});