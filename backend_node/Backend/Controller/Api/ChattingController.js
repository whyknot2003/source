require('rootpath')();

let moment = require('moment');

let mysql = require('../../DB/mysql_Controller');
let CommonController = require('../CommonController');

exports.getPetPlaces = async function (req, res, next) {

    console.log('gettign pet place' + req.body.latitude + " " + req.body.longtitude);

    var randomIndex = req.body.latitude - 0.01;
    var endIndex = req.body.latitude + 0.01;
    var randomIndex1 = req.body.longtitude - 0.01;
    var endIndex1 = req.body.longtitude + 0.01;

    let whereStr = " place_lat<" + endIndex + " and place_lat>" + randomIndex
        + " and place_lng>" + randomIndex1 + " and place_lng<" + endIndex1;

        console.log(whereStr);

    let managerList = await mysql.findAll("pet_places",whereStr);
    for (let i = 0; i < managerList.length; i++) {
        let managerInfo = managerList[i];
    }

    return res.json({
        status: 1,
        info: managerList
    });
}

exports.getPetPlaces1 = async function (req, res, next) {

    console.log('gettign pet place' + req.body.latitude + " " + req.body.longtitude);

    var randomIndex = req.body.latitude;
    var endIndex = req.body.longtitude;

    let whereStr = " place_lat=" + randomIndex + " and place_lng=" + endIndex;

        console.log(whereStr);

    let managerList = await mysql.findAll("pet_places",whereStr);
    for (let i = 0; i < managerList.length; i++) {
        let managerInfo = managerList[i];
    }

    return res.json({
        status: 1,
        info: managerList
    });
}

exports.checkLogin = async function (req, res, next) {

    console.log('check login' );
    console.log(req.body.email);

    let whereStr = " user_email=" + "'" + req.body.email + "'";
    let managerList = await mysql.findAll("pet_users",whereStr);
    if( managerList.length > 0) {

        let whereStr1 = " user_email=" + "'" + req.body.email + "'";
        let managerList1 = await mysql.findAll("pet_users",whereStr1);
        let owner = '';
        for (let i = 0; i < managerList1.length; i++) {
            owner = managerList1[i]['user_id'];
        }

        return res.json({
            status: 1,
            user_id: owner
        });
    }
    else{
        return res.json({
            status: 0
        });
    }
}

exports.getPetActivities = async function (req, res, next) {

    console.log('gettign pet activity');
    let managerList = await mysql.findAll("pet_activities");
    for (let i = 0; i < managerList.length; i++) {
        let managerInfo = managerList[i];
    }

    return res.json({
        status: 1,
        info: managerList
    });
}


exports.AddPetActivities = async function (req, res, next) {

    console.log('adding pet activity123');
    console.log(req.body.ac_name);

    var file_name= "";
    if(req.file){
        file_name = "http://" + req.headers.host + "/party/" + req.file.filename;
    }
    console.log(file_name);

    await mysql.insertOne("pet_activities", {
        activity_name: req.body.ac_name,
        activity_village: req.body.ac_vil,
        activity_num: req.body.ac_num,
        activity_price: req.body.ac_price,
        activity_category: req.body.ac_cat,
        activity_intro: req.body.ac_intro,
        activity_careful: req.body.ac_careful,
        activity_right: req.body.ac_right,
        creator_id: req.body.creator_id,
        activity_image: file_name
    });

    return res.json({
        status: 1
    });
}

exports.AddPetBank = async function (req, res, next) {

    await mysql.insertOne("pet_bank", {
        bank_name: req.body.user_name,
        name: req.body.user_addr,
        bank_no: req.body.user_phone,
        user_id: req.body.user_id
    });

    return res.json({
        status: 1
    });
}

exports.regUser = async function (req, res, next) {

    console.log('registering user');
    console.log(req.body.pet_name);
    console.log(req.body.pet_birthday);
    console.log(req.body.pet_type);
    console.log(req.body.pet_type1);
    console.log(req.body.pet_character);
    console.log(req.body.pet_sex);
    console.log(req.body.pet_sex1);
    console.log(req.body.user_name);
    console.log(req.body.user_age);
    console.log(req.body.user_addr);
    console.log(req.body.user_phone);
    console.log(req.body.user_email);


    await mysql.insertOne("pet_users", {
        user_name: req.body.user_name,
        user_age: req.body.user_age,
        user_email: req.body.user_email,
        user_addr: req.body.user_addr,
        user_phone: req.body.user_phone,
        user_sex: req.body.user_sex
    });

    let whereStr = " user_email=" + "'" + req.body.user_email + "'";
    let managerList = await mysql.findAll("pet_users",whereStr);
    let owner = '';
    for (let i = 0; i < managerList.length; i++) {
        owner = managerList[i]['user_id'];
    }

    await mysql.insertOne("pet_list", {
        pet_name: req.body.pet_name,
        pet_birtday: req.body.pet_birthday,
        pet_type: req.body.pet_type,
        pet_type1: req.body.pet_type1,
        pet_character: req.body.pet_character,
        pet_sex: req.body.pet_sex,
        pet_sex1: req.body.pet_sex1,
        pet_owner: owner
    });

    return res.json({
        status: 1,
        user_id: owner
    });
}

exports.AddPetMeets = async function (req, res, next) {

    console.log('adding pet meet');
    console.log(req.body.ac_name);

    
    var file_name= "";
    if(req.file){
        file_name = "http://" + req.headers.host + "/party/" + req.file.filename;
    }
    console.log(file_name);

    await mysql.insertOne("pet_meets", {
        meet_name: req.body.ac_name,
        meet_village: req.body.ac_vil,
        meet_num: req.body.ac_num,
        meet_category: req.body.ac_cat,
        meet_intro: req.body.ac_intro,
        meet_careful: req.body.ac_careful,
        creator_id: req.body.creator_id,
        meet_image: file_name

    });

    return res.json({
        status: 1
    });
}

exports.AddPetFeeds = async function (req, res, next) {

    console.log('adding pet feed');
    console.log(req.body.ac_name);

    var file_name= "";
    if(req.file){
        file_name = "http://" + req.headers.host + "/party/" + req.file.filename;
    }
    console.log(file_name);

    await mysql.insertOne("pet_feeds", {
        feed_name: req.body.ac_name,
        feed_location: req.body.ac_location,
        creator_id: req.body.creator_id,
        meet_image: file_name
    });

    return res.json({
        status: 1
    });
}

exports.AddChatting1 = async function (req, res, next) {

    console.log('adding pet chat');


    await mysql.insertOne("pet_chatting1", {
        chatting_content: req.body.chatting_content,
        activity_id: req.body.activity_id,
        user_id: req.body.creator_id
    });

    return res.json({
        status: 1
    });
}

exports.AddChatting2 = async function (req, res, next) {

    console.log('adding pet chat2');


    await mysql.insertOne("pet_chatting2", {
        chatting_content: req.body.chatting_content,
        meet_id: req.body.activity_id,
        user_id: req.body.creator_id
    });

    return res.json({
        status: 1
    });
}

exports.getPetMeets = async function (req, res, next) {

    console.log('gettign pet meet');
    let managerList = await mysql.findAll("pet_meets");
    for (let i = 0; i < managerList.length; i++) {
        let managerInfo = managerList[i];
    }

    return res.json({
        status: 1,
        info: managerList
    });
}

exports.getPetUser = async function (req, res, next) {

    console.log('gettign pet user info');
    let whereStr = " user_id=" + req.body.user_id;
    let managerList = await mysql.findAll("pet_users",whereStr);
    let managerInfo;
    for (let i = 0; i < managerList.length; i++) {
        managerInfo = managerList[i];
    }

    return res.json({
        status: 1,
        info: managerInfo
    });
}

exports.getPetChatting1 = async function (req, res, next) {

    console.log('gettign pet chatting info1');
    let whereStr = " activity_id=" + req.body.activity_id;
    let managerList = await mysql.findAll("pet_chatting1",whereStr);
    

    return res.json({
        status: 1,
        info: managerList
    });
}

exports.getPetChatting2 = async function (req, res, next) {

    console.log('gettign pet chatting info2');
    let whereStr = " meet_id=" + req.body.meet_id;
    let managerList = await mysql.findAll("pet_chatting2",whereStr);

    return res.json({
        status: 1,
        info: managerList
    });
}

exports.getPetUserBank = async function (req, res, next) {

    console.log('gettign pet user info');
    let whereStr = " user_id=" + req.body.user_id;
    let managerList = await mysql.findAll("pet_bank",whereStr);
    let managerInfo;
    for (let i = 0; i < managerList.length; i++) {
        managerInfo = managerList[i];
    }

    return res.json({
        status: 1,
        info: managerInfo
    });
}

exports.getPetFeeds = async function (req, res, next) {

    console.log('gettign pet feed');
    let managerList = await mysql.findAll("pet_feeds");
    for (let i = 0; i < managerList.length; i++) {
        let managerInfo = managerList[i];
    }

    return res.json({
        status: 1,
        info: managerList
    });
}


exports.getChatManagerList = async function (req, res, next) {
    let managerList = await mysql.findAll("users", {
        admin_type: 2
    });
    for (let i = 0; i < managerList.length; i++) {
        let managerInfo = managerList[i];
        let whereStr = '(sender_uid=' + req.body.uid + ' AND receiver_uid=' + managerInfo['id'] + ') OR (receiver_uid=' + req.body.uid + ' AND sender_uid=' + managerInfo['id'] + ')';
        let lastInfo = await mysql.findOneOrderBY("chatting", whereStr, "contents, chat_type, TIME_TO_SEC(TIMEDIFF(NOW(), created_at)) diff_sec", "created_at", "DESC");
            managerInfo['contents'] = lastInfo ? lastInfo['contents'] : '';
            managerInfo['chat_type'] = lastInfo ? lastInfo['chat_type'] : -1;
            managerInfo['chat_time'] = lastInfo ? CommonController.GetKoreanFormatFromSec(lastInfo['diff_sec']) : "";
        let unreadInfo = await mysql.findOne("chatting", {
            receiver_uid: req.body.uid,
            sender_uid: managerInfo['id'],
            read_state: "N"
        }, "COUNT(*) unread_count");
        managerInfo['unread_count'] = unreadInfo['unread_count'];
    }

    return res.json({
        status: 1,
        info: managerList
    });
}

exports.getChatListWithManager = async function (req, res, next) {
        //get manager info
        let managerInfo = await mysql.findOne("users", {id: req.body.manager_id}, "name, avatar_url");
        let whereStr = '(sender_uid=' + req.body.uid + ' AND receiver_uid=' + req.body.manager_id + ') OR (receiver_uid=' + req.body.uid + ' AND sender_uid=' + req.body.manager_id + ')';
        let chatList = await mysql.findAll("chatting", whereStr, "*, TIME_TO_SEC(TIMEDIFF(NOW(), created_at)) diff_sec");
        // chatList = convertStdClassToArray($chatList);
        for(let i = 0 ; i < chatList.length ; i ++){
            chatList[i]['chat_time'] = CommonController.GetKoreanFormatFromSec(chatList[i]['diff_sec']);   
        }

        //???????????? ??????
        let configInfo = await mysql.findOne("site_config", {}, "DATE_FORMAT(mc_start_time,'%H??? %i???') start_time, DATE_FORMAT(mc_end_time,'%H??? %i???') end_time, IF(mc_start_time<=NOW() && mc_end_time>=NOW(), 1, 0) allow_time");

        if(configInfo['allow_time'] == 0){
            let chatInfo = {};
            chatInfo['sender_uid'] = req.body.manager_id;
            chatInfo['receiver_uid'] = req.body.uid;
            chatInfo['contents'] = '?????? ?????? ????????? ?????? ????????? ????????????. ?????? ?????? ????????? ????????? ????????? ?????? ????????????????????????';
            chatInfo['img_url'] = '';
            chatInfo['read_state'] = 'Y';
            chatInfo['sender_type'] = 1;
            chatInfo['chat_type'] = 1;
            chatInfo['chat_time'] = "?????????";

            chatList.push(chatInfo);
        }
        else{
            let chatInfo = {};
            chatInfo['sender_uid'] = req.body.manager_id;
            chatInfo['receiver_uid'] = req.body.uid;
            chatInfo['contents'] = '??????????????? ?????????. ????????? ?????????????????? ????????? ????????? ?????? ??????????????????????????? :) ?????? Another Class??? ?????? ????????? ??????????????? ??????????????? ????????? ?????? ?????????????????? ?????? ??????????????????. ????????? ??????????????? ??????????????? ?????? ????????? ???????????? ???????????????????????? ???????????????';
            chatInfo['img_url'] = '';
            chatInfo['read_state'] = 'Y';
            chatInfo['sender_type'] = 1;
            chatInfo['chat_type'] = 1;
            await mysql.insertOne("chatting", chatInfo);

            chatInfo['chat_time'] = "?????????";
            chatList.push(chatInfo);
        }
        
        info = {};
        info['manager_info'] = managerInfo;
        info['chat_list'] = chatList;

        await mysql.updateOne("chatting", {sender_uid: req.body.manager_id, receiver_uid: req.body.uid}, {read_state: "Y"});
        return res.json({status: 1, info: info});
}

exports.updatePetUser = async function (req, res, next){

    console.log(req.body);
    console.log(req.body.user_sex);
    await mysql.updateOne("pet_users", {user_id: req.body.user_id}, 
                                    {user_name: req.body.user_name, 
                                        user_age: req.body.user_age,
                                        user_addr: req.body.user_addr,
                                        user_phone: req.body.user_phone,
                                        user_sex: req.body.user_sex,
                                    });
    return res.json({status: 1});
}

exports.getMyManagerId = async function (req, res, next){
    
    let customerInfo = await mysql.findOne("customers", {id: req.body.uid}, "manager_id");
    let managerId = 0;
    if(customerInfo){
        managerId = customerInfo['manager_id'];
    }

    if(managerId == 0){
        return res.json({status: 0, msg:'???????????????. ???????????? ???????????? ???????????????. ????????? ??????????????????.'});
    }
    return res.json({status: 1, info: managerId});
}

exports.sendChatToAdmin = async function(req, res, next){
    await mysql.insertOne("chatting", {
        sender_uid: req.body.uid,
        receiver_uid: req.body.manager_id,
        sender_type: 2,
        chat_type: req.body.chat_type,
        img_url: req.body.chat_type == 2 ? req.body.img_url : "",
        contents: req.body.chat_type != 2 ? req.body.contents: ""
    });
    return res.json({status: 1, msg: "success"});
}

exports.sendChatToUser = async function(req, res, next){
    
    //check this later(add sendfcm)

    let ret = await mysql.insertOne("chatting", {
        sender_uid: req.body.manager_id,
        receiver_uid: req.body.uid,
        sender_type: 1,
        chat_type: req.body.chat_type,
        img_url: req.body.chat_type == 2 ? req.body.img_url : "",
        contents: req.body.chat_type != 2 ? req.body.contents: ""
    });

    //socket ??????
    var message = req.body.chat_type == 1 ? req.body.contents : '?????????';
    let socketInfo = {
        message: message,
        sender_uid: req.body.manager_id,
        receiver_uid: req.body.uid
    }
    
    /*let targeterInfo = await mysql.findOne('customers', {id:req.body.uid}, 'device_token');
    
        if(targeterInfo['device_token'] != ''){
            console.log('send chat3');
            let sendObj = {
                uid: req.body.uid,
                device_token: targeterInfo['device_token'],
                type: 24,
                content_type: '',
                content: req.body.chat_type
            }
            console.log('send chat4');
            await CommonController.sendFcm(sendObj);//added to alarm_list
        }*/

    //???????????? ?????? socket ??????
    await CommonController.sendSocketData(req.body.uid, 'send_chat', socketInfo);

    let chatDataList = await mysql.findAll('chatting', {id:ret});
    for(let key in chatDataList){
        chatDataList[key]['customer'] = await mysql.findOne('customers', {id:req.body.uid});
        let contentData = chatDataList[key]['contents'].split('/\r\n/');
        chatDataList[key]['contents'] = contentData;
        chatDataList[key]['create_date'] = moment(chatDataList[key]['created_at']).format("Y-m-d H:i:s");
        if(chatDataList[key]['chat_type'] == 3){
            chatDataList[key]['dailycard'] = await mysql.findOne('customers', {id:chatDataList[key]['img_url']});
        }
    }
    
    return res.json({status: 1, msg: "success", info:chatDataList, last_id:ret});
}

exports.getUnreadChatList = async function(req, res, next){
    let whereStr = "sender_uid=" + req.body.manager_id + ' AND receiver_uid=' + req.body.uid + " AND read_state = 'N' AND sender_type = 1 AND chat_type != 3";
    let chatList = await mysql.findAll("chatting", whereStr);

    whereStr = "sender_uid=" + req.body.manager_id + ' AND receiver_uid=' + req.body.uid + " AND read_state = 'N' AND sender_type = 1";
    await mysql.updateOne("chatting", whereStr, {read_state: "Y"});
    return res.json({status: 1, info: chatList});
}


exports.getCoupleManager = async function(req, res, next){
    
    //??????????????? ??????
    let managerInfo = await mysql.findOne("customers", {id: req.body.customer_id}, "manager_id");
    let coupleMangerId = managerInfo['manager_id'];
    if(coupleMangerId == 0){
        let coupleManagerList = await mysql.findAll("users", {admin_type: 2}, "id");
        if(coupleManagerList.length == 0){
            return res.json({status: 0, msg: '????????? ?????????????????? ????????????.'});
        }
        let randNum = Math.floor(Math.random(coupleManagerList.length));
        coupleMangerId = coupleManagerList[randNum]['id'];
        await mysql.updateOne("customers", {id: req.body.customer_id}, {manager_id: coupleMangerId});
    }
    coupleManagerInfo = await mysql.findOne("users", {id: coupleMangerId}, "id, name");

    //???????????? ????????????????????? ?????????????????? ?????????
    await mysql.insertOne("chatting", {
        sender_uid: req.body.uid,
        receiver_uid: coupleMangerId,
        sender_type: 2,
        chat_type: 3,
        img_url: req.body.customer_id,
        contents: '???????????? ??? ????????? ????????? ???????????? ???????????? ?????? ?????????. ????????? ?????????????????? ????????? ????????? ???????????? ????????????????????? ???????????????',
    });

    //?????????????????? ??????????????? ???????????? ?????????

    let configInfo = await mysql.findOne("site_config", {}, "DATE_FORMAT(mc_start_time,'%H??? %i???') start_time, DATE_FORMAT(mc_end_time,'%H??? %i???') end_time");

    await mysql.insertOne("chatting", {
        sender_uid: coupleMangerId,
        receiver_uid: req.body.uid,
        sender_type: 1,
        chat_type: 1,
        contents: '???????????????. ????????? ' + coupleManagerInfo['name'] + '?????????. ?????? ?????? ????????? ' + configInfo['start_time'] + '~' + configInfo['end_time'] + '?????????, ????????? ?????????????????? ????????? ????????? ???????????? ?????? ?????? ?????????????????? ???????????????',
    });

    return res.json({status: 1, info: coupleMangerId});
}
