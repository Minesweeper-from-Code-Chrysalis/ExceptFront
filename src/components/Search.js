import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Container, Box, Button, Checkbox, TextField, MenuItem } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import areaList from "../data/area.json";
import Icon from "../images/except.png";

const BlackCheckbox = withStyles({
  root: {
    color: indigo[400],
    "&$checked": {
      color: indigo[400],
    },
  },
  checked: {},
})(Checkbox);

const Accordion = withStyles({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderTop: "1px solid rgba(55, 55, 55, 0.3)",
    borderBottom: "1px solid rgba(55, 55, 55, 0.3)",
    boxShadow: "none",
    borderRadius: 0,
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderBottom: "1px solid rgba(0, 0, 0, 0)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function Search(props) {
  let sceneItems = [];
  let allergiesItems = [];
  let foodstuffItems = [];
  const facilityItems = [];
  const [sceneState, setSceneState] = React.useState({
    sceneCheckedA: {
      word: "飲み会",
      check: false,
    },
    sceneCheckedB: {
      word: "デート",
      check: false,
    },
    sceneCheckedC: {
      word: "子供連れ",
      check: false,
    },
    sceneCheckedD: {
      word: "学生",
      check: false,
    },
    sceneCheckedE: {
      word: "高級",
      check: false,
    },
  });
  const [allergiesState, setAllergiesState] = React.useState({
    AllergiesCheckedA: {
      word: "小麦",
      check: false,
    },
    AllergiesCheckedB: {
      word: "乳",
      check: false,
    },
    AllergiesCheckedC: {
      word: "卵",
      check: false,
    },
    AllergiesCheckedD: {
      word: "そば",
      check: false,
    },
    AllergiesCheckedE: {
      word: "海老",
      check: false,
    },
    AllergiesCheckedF: {
      word: "蟹",
      check: false,
    },
    AllergiesCheckedG: {
      word: "ナッツ",
      check: false,
    },
  });

  const [foodstuffState, setFoodstuffState] = React.useState({
    foodstuffCheckedA: {
      word: "野菜",
      check: false,
    },
    foodstuffCheckedB: {
      word: "トマト",
      check: false,
    },
    foodstuffCheckedC: {
      word: "ナス",
      check: false,
    },
    foodstuffCheckedD: {
      word: "にんにく",
      check: false,
    },
    foodstuffCheckedE: {
      word: "パクチー",
      check: false,
    },
    foodstuffCheckedF: {
      word: "ピーマン",
      check: false,
    },
  });

  const [facilityState, setFacilityState] = React.useState({
    facilityCheckedA: {
      word: "エアコン",
      check: false,
    },
    facilityCheckedB: {
      word: "ビュッフェ",
      check: false,
    },
    facilityCheckedC: {
      word: "座敷",
      check: false,
    },
    facilityCheckedD: {
      word: "カウンター",
      check: false,
    },
    facilityCheckedE: {
      word: "狭い",
      check: false,
    },
  });
  const [exceptWord, setExceptWord] = useState("");
  //   const [exceptTag, setExceptTag] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [lowerBudget, setLowerBudget] = useState(0);
  const [upperBudget, setUpperBudget] = useState(999999);
  const [keyword, setKeyword] = useState("");
  const { allShops, setAllShops, setCurrentView } = props;
  const budgetList = [500, 800, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 10000, 20000, 30000];
  const pullDownBudget = [];
  pullDownBudget.push(<MenuItem key="指定なし">指定なし</MenuItem>);
  Object.entries(budgetList).map(([key, value]) => {
    return pullDownBudget.push(
      <MenuItem key={key} value={value}>
        {value}
      </MenuItem>
    );
  });

  const baseUrl = "https://api.except-app.com/shops";

  const [countBefore, setCountBefore] = useState(0);
  const [countAfter, setCountAfter] = useState(0);

  const handleChange = (event) => {
    setSceneState({ ...sceneState, [event.target.id]: { word: event.target.name, check: event.target.checked } });
  };
  sceneItems = [];
  Object.entries(sceneState).map(([key, value]) => {
    return sceneItems.push(<FormControlLabel control={<BlackCheckbox checked={value.check} onChange={handleChange} id={key} name={value.word} />} label={value.word} key={key} />);
  });

  const allergiesHandleChange = (event) => {
    setAllergiesState({ ...allergiesState, [event.target.id]: { word: event.target.name, check: event.target.checked } });
  };
  allergiesItems = [];
  Object.entries(allergiesState).map(([key, value]) => {
    return allergiesItems.push(<FormControlLabel control={<BlackCheckbox checked={value.check} onChange={allergiesHandleChange} id={key} name={value.word} />} label={value.word} key={key} />);
  });

  const foodstuffHandleChange = (event) => {
    setFoodstuffState({ ...foodstuffState, [event.target.id]: { word: event.target.name, check: event.target.checked } });
  };
  foodstuffItems = [];
  Object.entries(foodstuffState).map(([key, value]) => {
    return foodstuffItems.push(<FormControlLabel control={<BlackCheckbox checked={value.check} onChange={foodstuffHandleChange} id={key} name={value.word} />} label={value.word} key={key} />);
  });

  const facilityHandleChange = (event) => {
    setFacilityState({ ...facilityState, [event.target.id]: { word: event.target.name, check: event.target.checked } });
  };
  Object.entries(facilityState).map(([key, value]) => {
    return facilityItems.push(<FormControlLabel control={<BlackCheckbox checked={value.check} onChange={facilityHandleChange} id={key} name={value.word} />} label={value.word} key={key} />);
  });

  if (allShops[0]) {
    if (countAfter !== allShops[0].length) {
      setCountAfter(allShops[0].length);
      let priceOptions = countBefore;
      const optionsPrice = allShops[0].length;
      const timerPrice = setInterval(function () {
        if (priceOptions !== optionsPrice) {
          if (priceOptions < optionsPrice) {
            if (Math.round((optionsPrice - priceOptions) / 5) === 0) {
              priceOptions += 1;
            } else {
              priceOptions += Math.round((optionsPrice - priceOptions) / 5);
            }
          } else if (Math.round((priceOptions - optionsPrice) / 5) === 0) {
            priceOptions -= 1;
          } else {
            priceOptions -= Math.round((priceOptions - optionsPrice) / 5);
          }
        } else {
          clearInterval(timerPrice);
        }
        setCountBefore(priceOptions);
      }, 70);
    }
  }

  const getAllShops = async () => {
    let url = `${baseUrl}?areaCode=${areaCode}&lowerBudget=${lowerBudget}&upperBudget=${upperBudget}`;
    let tags = "";
    Object.entries(sceneState).map(([, value]) => {
      if (value.check === true) {
        if (tags !== "") {
          tags = `${tags},${value.word}`;
        } else {
          tags = value.word;
        }
      }
      return null;
    });
    Object.entries(allergiesState).map(([, value]) => {
      if (value.check === true) {
        if (tags !== "") {
          tags = `${tags},${value.word}`;
        } else {
          tags = value.word;
        }
      }
      return null;
    });
    Object.entries(foodstuffState).map(([, value]) => {
      if (value.check === true) {
        if (tags !== "") {
          tags = `${tags},${value.word}`;
        } else {
          tags = value.word;
        }
      }
      return null;
    });
    Object.entries(facilityState).map(([, value]) => {
      if (value.check === true) {
        if (tags !== "") {
          tags = `${tags},${value.word}`;
        } else {
          tags = value.word;
        }
      }
      return null;
    });
    console.log(tags);

    const replace = exceptWord.replace(/\s+/g, ",");
    let convertExcept = replace;
    if(tags !== ""){
      convertExcept = `${convertExcept},${tags}`
    }
    if (convertExcept[0] === ",") {
      convertExcept = convertExcept.substring(1);
    }
    if (convertExcept !== "") {
      url = `${url}&exceptWord=${encodeURIComponent(convertExcept)}`;
    }

    if (keyword.length > 0) {
      url = `${url}&keyword=${encodeURIComponent(keyword)}`;
    }
    console.log(url);
    // const preData = await fetch(url);
    // const result = await preData.status;

    // if (result === 400) {
    //   setCurrentView("Error");
    // } else {
    //   const data = await fetch(url).then((res) => res.json());
    //   setAllShops([data]);
    // }
    setAllShops([
      [
        {
          "@attributes": { order: 0 },
          id: "gak5848",
          update_date: "2020-12-02T01:51:20+09:00",
          name: "全席個室 楽蔵うたげ 渋谷駅前店",
          name_kana: "ゼンセキコシツラクゾウウタゲ シブヤエキマエテン",
          latitude: "35.659851",
          longitude: "139.702102",
          category: "渋谷居酒屋和食寿司個室",
          url: "https://r.gnavi.co.jp/gak5848/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          url_mobile: "http://mobile.gnavi.co.jp/shop/gak5848/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          coupon_url: { pc: "https://r.gnavi.co.jp/gak5848/coupon/", mobile: "http://mobile.gnavi.co.jp/shop/gak5848/coupon" },
          image_url: {
            shop_image1: "https://rimage.gnst.jp/rest/img/9k5d4gc60000/t_00d5.jpg",
            shop_image2: "https://rimage.gnst.jp/rest/img/9k5d4gc60000/t_0005.jpg",
            qrcode: "https://c-r.gnst.jp/tool/qr/?id=gak5848&q=6",
          },
          address: "〒150-0002 東京都渋谷区渋谷1-24-12 渋谷東映プラザ6F",
          tel: "050-3468-5343",
          tel_sub: "03-6418-9791",
          fax: "",
          opentime:
            "月～金・日・祝前日・祝日 17:00～23:30\n土 16:00～23:30(※営業時間前も宴会可能！(早割・遅割特典有)  ※諸般の事情により、営業時間を変更させていただく事がございます。詳細はお電話にてお問合せくださいませ。)",
          holiday: "無\n※※諸般の事情により、定休日を変更させていただく事がございます。詳細はお電話にてお問合せくださいませ。",
          access: { line: "ＪＲ", station: "渋谷駅", station_exit: "東口", walk: "1", note: "" },
          parking_lots: "",
          pr: {
            pr_short: "◇JR渋谷駅 東口 徒歩1分 ◆2時間飲放付コース全10品4000円(税込)～ ◇ネット予約は24時間、電話は朝10時より受付中 ◆2名～最大48名様まで全席完全個室を完備",
            pr_long:
              '※アルコール除菌剤設置、定期的な換気、除菌清掃徹底、ソーシャルディスタンス確保、\nマスク着用、従業員の体調管理徹底等十分な新型コロナ対策行っております。\n◆炙り×肉×魚◆\n職人こだわりの"炙り"で旨みを引き立たせた鶏料理と、\n厳選した山・海の幸を贅沢に使った逸品をご用意しております。\n◆こだわりの個室◆\n小人数様の接待から大宴会まで、個室でご対応致します。\n掘りごたつや椅子がメインの和モダン個室で、ゆとりの時間をお過ごしくださいませ。\n◆飲み放題付き宴会コース◆\n2h飲み放題付きコースご用意ございます。\n早い時間（～17時）・遅い時間（21時～）はもっとお得に。\n割引クーポンはクーポンページをご覧ください♪',
          },
          code: {
            areacode: "AREA110",
            areaname: "関東",
            prefcode: "PREF13",
            prefname: "東京都",
            areacode_s: "AREAS2127",
            areaname_s: "渋谷東口・宮益坂",
            category_code_l: ["RSFST09000", ""],
            category_name_l: ["居酒屋", ""],
            category_code_s: ["RSFST09004", ""],
            category_name_s: ["居酒屋", ""],
          },
          budget: 3500,
          party: 2500,
          lunch: "",
          credit_card: "VISA,MasterCard,UC,DC,UFJ,ダイナースクラブ,アメリカン・エキスプレス,JCB,NICOS,アプラス,セゾン,MUFG",
          e_money: "",
          flags: { mobile_site: 1, mobile_coupon: 1, pc_coupon: 1 },
        },
        {
          "@attributes": { order: 1 },
          id: "g493593",
          update_date: "2020-12-02T01:30:00+09:00",
          name: "全席個室 鮮や一夜 新宿東口駅前店",
          name_kana: "ゼンセキコシツセンヤイチヤ シンジュクヒガシグチエキマエテン",
          latitude: "35.690611",
          longitude: "139.701711",
          category: "新宿居酒屋寿司和食個室",
          url: "https://r.gnavi.co.jp/g493593/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          url_mobile: "http://mobile.gnavi.co.jp/shop/g493593/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          coupon_url: { pc: "https://r.gnavi.co.jp/g493593/coupon/", mobile: "http://mobile.gnavi.co.jp/shop/g493593/coupon" },
          image_url: { shop_image1: "https://rimage.gnst.jp/rest/img/casj6tth0000/t_006k.jpg", shop_image2: "", qrcode: "https://c-r.gnst.jp/tool/qr/?id=g493593&q=6" },
          address: "〒160-0022 東京都新宿区新宿3-36-10 ミラザビル5F",
          tel: "050-3462-5191",
          tel_sub: "03-5919-3722",
          fax: "",
          opentime: " 17:00～23:30(※営業時間前も宴会可能！(早割・遅割特典有)  ※諸般の事情により、営業時間を変更させていただく事がございます。詳細はお電話にてお問合せくださいませ。)",
          holiday: "無\n※※諸般の事情により、定休日を変更させていただく事がございます。詳細はお電話にてお問合せくださいませ。",
          access: { line: "ＪＲ", station: "新宿駅", station_exit: "中央東口", walk: "1", note: "" },
          parking_lots: "",
          pr: {
            pr_short: "◇JR新宿駅 中央東口 徒歩1分 ◆2時間飲放付コース全9品4000円(税込)～ ◇ネット予約は24時間、電話は朝10時より受付中 ◆2名～最大44名様まで全席完全個室を完備",
            pr_long:
              "※アルコール除菌剤設置、定期的な換気、除菌清掃徹底、ソーシャルディスタンス確保、\nマスク着用、従業員の体調管理徹底等十分な新型コロナ対策行っております。\n◆旬×海鮮×炙り◆\n旬魚と創作和食を味わえる、デザイナーズ和モダンダイニング。\nスタイリッシュな和の空間で豊かな日本の四季を食す喜びと語らう楽しみを。\n◆ワンランク上の個室◆\n様々なシーンで利用できる隠れ家個室をご用意しております。\n接待はもちろん、カジュアルなお集まりまで、自信をもっておもてなし致します。\n◆飲み放題付き宴会コース◆\n2h飲み放題付4000円(税抜)～ご用意ございます。\n早い時間（～17時）・遅い時間（21時～）はもっとお得に。\nお得な割引クーポンはクーポンページをご覧ください♪",
          },
          code: {
            areacode: "AREA110",
            areaname: "関東",
            prefcode: "PREF13",
            prefname: "東京都",
            areacode_s: "AREAS2115",
            areaname_s: "新宿東口・歌舞伎町",
            category_code_l: ["RSFST09000", ""],
            category_name_l: ["居酒屋", ""],
            category_code_s: ["RSFST09004", ""],
            category_name_s: ["居酒屋", ""],
          },
          budget: 4000,
          party: 4500,
          lunch: "",
          credit_card: "VISA,MasterCard,UC,DC,UFJ,ダイナースクラブ,アメリカン・エキスプレス,JCB,NICOS,アプラス,セゾン,MUFG",
          e_money: "",
          flags: { mobile_site: 1, mobile_coupon: 1, pc_coupon: 1 },
        },
        {
          "@attributes": { order: 2 },
          id: "g306506",
          update_date: "2020-12-01T18:10:59+09:00",
          name: "個室居酒屋 隠れ野 渋谷店",
          name_kana: "コシツイザカヤカクレヤ シブヤテン",
          latitude: "35.657641",
          longitude: "139.699442",
          category: "渋谷個室居酒屋和風浪漫",
          url: "https://r.gnavi.co.jp/g306506/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          url_mobile: "http://mobile.gnavi.co.jp/shop/g306506/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          coupon_url: { pc: "https://r.gnavi.co.jp/g306506/coupon/", mobile: "http://mobile.gnavi.co.jp/shop/g306506/coupon" },
          image_url: {
            shop_image1: "https://rimage.gnst.jp/rest/img/2193ahd60000/t_010h.jpg",
            shop_image2: "https://rimage.gnst.jp/rest/img/2193ahd60000/t_010k.jpg",
            qrcode: "https://c-r.gnst.jp/tool/qr/?id=g306506&q=6",
          },
          address: "〒150-0043 東京都渋谷区道玄坂1-7-1 第1渋観ビルB1～B2",
          tel: "050-3462-4193",
          tel_sub: "03-3462-9339",
          fax: "03-3462-9339",
          opentime: "月～木 ディナー：17:00～23:30(L.O.22:30、ドリンクL.O.23:00)\n金・土・祝前日 ディナー：17:00～翌4:00(L.O.3:00、ドリンクL.O.3:30)",
          holiday: "毎週日曜日\nその他（2020年12月6日・2020年12月13日）\n※12月は休まず営業いたします(営業時間：17:00～23:30)\n※※12/20・27は休まず営業いたします。",
          access: { line: "ＪＲ", station: "渋谷駅", station_exit: "南口", walk: "2", note: "" },
          parking_lots: "",
          pr: {
            pr_short: "GoToトラベル電子、紙クーポン利用できます！鍋メニュー始めました。 大都会渋谷にある秘密の隠家、感染予防を徹底し営業しております。",
            pr_long:
              "【渋谷駅1分｜創業20年の老舗個室居酒屋】\n感染リスクを最小限に抑え、お客様のご要望に最大限にお応えすべく努めて参ります。\n東急PLAZAの真裏！安心のゆったり個室完備。\n旬の食材を使い、様々な料理をご用意しております。\n厳選した日本酒・焼酎も豊富！季節限定の料理をお酒と一緒に味わってみませんか？\n◆【衛生への取り組み】\n・店内消毒と換気\n・充分なお客様同士の間隔の確保\n・従業員の衛生管理の徹底\n・個室へのご案内\n■完全個室■\n・扉付個室2名～60名利用可♪貸切も♪\n\n■接待・会食■\n・和食料理人が造る絶品和食！築地直送海鮮！\n■2020.10.20～肉バルフェア開催■\nヘルシーな牛ロース肉を使用し、4種類の新メニューが登場です☆\n期間限定のお試し価格でのご提供！",
          },
          code: {
            areacode: "AREA110",
            areaname: "関東",
            prefcode: "PREF13",
            prefname: "東京都",
            areacode_s: "AREAS2126",
            areaname_s: "道玄坂・神泉",
            category_code_l: ["RSFST09000", ""],
            category_name_l: ["居酒屋", ""],
            category_code_s: ["RSFST09004", ""],
            category_name_s: ["居酒屋", ""],
          },
          budget: 3000,
          party: 4000,
          lunch: "",
          credit_card: "VISA,MasterCard,ダイナースクラブ,アメリカン・エキスプレス,JCB",
          e_money: "PayPay",
          flags: { mobile_site: 1, mobile_coupon: 1, pc_coupon: 1 },
        },
        {
          "@attributes": { order: 3 },
          id: "g162902",
          update_date: "2020-12-02T02:32:11+09:00",
          name: "【全席個室】隠れ海鮮居酒屋 魚京助 新橋駅前店",
          name_kana: "ゼンセキコシツカクレカイセンイザカヤ ウオキョウスケシンバシエキマエテン",
          latitude: "35.666751",
          longitude: "139.756108",
          category: "完全個室 海鮮居酒屋",
          url: "https://r.gnavi.co.jp/392mhjwv0000/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          url_mobile: "http://mobile.gnavi.co.jp/shop/g162902/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          coupon_url: { pc: "https://r.gnavi.co.jp/392mhjwv0000/coupon/", mobile: "http://mobile.gnavi.co.jp/shop/g162902/coupon" },
          image_url: {
            shop_image1: "https://rimage.gnst.jp/rest/img/392mhjwv0000/t_0n7c.jpg",
            shop_image2: "https://rimage.gnst.jp/rest/img/392mhjwv0000/t_0n79.jpg",
            qrcode: "https://c-r.gnst.jp/tool/qr/?id=g162902&q=6",
          },
          address: "〒105-0004 東京都港区新橋2-15-18 プラザT2ビル",
          tel: "050-3468-4678",
          tel_sub: "03-6273-3307",
          fax: "",
          opentime: " 15:00～24:00(L.O.23:30、ドリンクL.O.23:30)",
          holiday: "不定休日あり",
          access: { line: "ＪＲ", station: "新橋駅", station_exit: "", walk: "3", note: "" },
          parking_lots: "",
          pr: {
            pr_short: "【困ったらココ】新橋の旨い居酒屋10選に選ばれました♪ ◇期間限定◇今こそポジティブに！全70種類1時間飲み放題1250円→397円 【感染防止徹底宣言ステッカー登録店舗】",
            pr_long:
              "■この冬ぴったりの「冬のコース」をご用意！\n9品 花コース5500円⇒４,５００円（税抜）\n10品 月コース6500円⇒５,５００円（税抜） S&SP付\n10品 雪コース7500円⇒６,５００円（税抜） S&SP&生付\n11品 蓬莱コース12000円⇒１０,０００円（税抜） S&SP&生付\n■活マグロ食べ放題コース ３０００円(税抜)～\nさらに今なら+999円（税別）で飲み放題付き♪\n+800円で飲み放題１ｈ延長可能＆＋1600円で飲み食べ放題１ｈ延長⇒３ｈ飲み放題!!\n■完全個室完備！ 2名様～個室でご案内いたします。\n接待や会食、新橋での和情緒溢れる空間\n扉付き完全個室を多数ご用意しております\nお席のみのご予約もお気軽にお問い合わせください。",
          },
          code: {
            areacode: "AREA110",
            areaname: "関東",
            prefcode: "PREF13",
            prefname: "東京都",
            areacode_s: "AREAS2107",
            areaname_s: "新橋",
            category_code_l: ["RSFST09000", ""],
            category_name_l: ["居酒屋", ""],
            category_code_s: ["RSFST09004", ""],
            category_name_s: ["居酒屋", ""],
          },
          budget: 2999,
          party: 3499,
          lunch: "",
          credit_card: "VISA,MasterCard,アメリカン・エキスプレス,JCB,銀聯",
          e_money: "LINE Pay,Alipay,Apple Pay,PayPay",
          flags: { mobile_site: 1, mobile_coupon: 1, pc_coupon: 1 },
        },
        {
          "@attributes": { order: 4 },
          id: "gdgc203",
          update_date: "2020-12-02T01:27:21+09:00",
          name: "地鶏の里 鶏極 新橋店",
          name_kana: "ジドリノサトトリキ シンバシテン",
          latitude: "35.665837",
          longitude: "139.757206",
          category: "新橋 個室居酒屋",
          url: "https://r.gnavi.co.jp/ctxjtrpm0000/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          url_mobile: "http://mobile.gnavi.co.jp/shop/gdgc203/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          coupon_url: { pc: "https://r.gnavi.co.jp/ctxjtrpm0000/coupon/", mobile: "http://mobile.gnavi.co.jp/shop/gdgc203/coupon" },
          image_url: {
            shop_image1: "https://rimage.gnst.jp/rest/img/ctxjtrpm0000/t_0nb7.jpg",
            shop_image2: "https://rimage.gnst.jp/rest/img/ctxjtrpm0000/t_0nb7.jpg",
            qrcode: "https://c-r.gnst.jp/tool/qr/?id=gdgc203&q=6",
          },
          address: "〒105-0004 東京都港区新橋3-16-3 7F",
          tel: "050-3467-3061",
          tel_sub: "045-550-5029",
          fax: "",
          opentime: "月～日 12:00～23:30",
          holiday: "無\n※年末年始",
          access: { line: "ＪＲ", station: "新橋駅", station_exit: "烏森口", walk: "1", note: "" },
          parking_lots: "",
          pr: {
            pr_short: "「Nスタ」「新・情報7daysニュースキャスター」で取材されました！ 【新橋駅すぐ】烏森口徒歩1分 【全席個室】2～70名様 【季節限定】新コース、鍋付きコース開始！",
            pr_long:
              "― 完全個室居酒屋 地鶏の里 鶏極 新橋店 ―\n個室2名様個室～最大70名様まで貸切宴会が可能！\n全室扉の付いた完全個室なので、接待や会食にも◎\n地鶏料理ををメインに、新鮮な海鮮・魚介類・農家直送の採れたて野菜など \n－－－－－－－－－－－－－－－－－－－－－－－－－\n＜営業再開のお知らせ＞\n6/9（火）より営業再開させていただきます。ご来店心よりお待ちしております。",
          },
          code: {
            areacode: "AREA110",
            areaname: "関東",
            prefcode: "PREF13",
            prefname: "東京都",
            areacode_s: "AREAS2107",
            areaname_s: "新橋",
            category_code_l: ["RSFST09000", ""],
            category_name_l: ["居酒屋", ""],
            category_code_s: ["RSFST09004", ""],
            category_name_s: ["居酒屋", ""],
          },
          budget: 2980,
          party: 3480,
          lunch: 2980,
          credit_card: "VISA,MasterCard,UC,DC,UFJ,ダイナースクラブ,アメリカン・エキスプレス,JCB,NICOS,アプラス,セゾン,J-DEBIT,銀聯,MUFG,Discover Card",
          e_money: "",
          flags: { mobile_site: 1, mobile_coupon: 1, pc_coupon: 1 },
        },
        {
          "@attributes": { order: 5 },
          id: "gdf5833",
          update_date: "2020-12-02T01:47:07+09:00",
          name: "創業昭和四十二年 鳥じゅん 品川店 二号店",
          name_kana: "ソウギョウショウワヨンジュウニネントリジュン シナガワテンニゴウテン",
          latitude: "35.629195",
          longitude: "139.742510",
          category: "品川炭火焼鳥専門店",
          url: "https://r.gnavi.co.jp/jv6t3vjp0000/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          url_mobile: "http://mobile.gnavi.co.jp/shop/gdf5833/?ak=Yf%2B3Mn008BGO8vFl48d0dkiv2zYXUBGxsVfpkqVi1dI%3D",
          coupon_url: { pc: "https://r.gnavi.co.jp/jv6t3vjp0000/coupon/", mobile: "http://mobile.gnavi.co.jp/shop/gdf5833/coupon" },
          image_url: { shop_image1: "https://rimage.gnst.jp/rest/img/jv6t3vjp0000/t_0neb.jpg", shop_image2: "", qrcode: "https://c-r.gnst.jp/tool/qr/?id=gdf5833&q=6" },
          address: "〒108-0075 東京都港区港南2-2-8 1F",
          tel: "050-3490-0004",
          tel_sub: "080-9693-3029",
          fax: "",
          opentime:
            "月～木・日・祝前日・祝日 17:00～24:00(※ランチ宴会はご予約のみ承っております。)\n金・土 16:00～翌1:00(※22時以降ご入店のお客様には、ご飲食の10％を「深夜料金」として加算させていただきます。)",
          holiday: "無",
          access: { line: "ＪＲ", station: "品川駅", station_exit: "", walk: "2", note: "" },
          parking_lots: "",
          pr: {
            pr_short: "◎創業昭和四十二年！伝統の味わい 3種のトーキョーハイボール何杯飲んでも1杯99円(税抜)！！ 全席窓付きなので換気もばっちり！寛ぎ度満点の広々空間完備◎",
            pr_long:
              "*・。 品川駅港南口徒歩3分《創業昭和四十二年の本格炭火焼き鳥》 。・*\n＼超お得なキャンペーンを開催中／\n 鳥じゅん名物の『かわ串』が1本99円！\n3種のトーキョーハイボールが何杯飲んでも1杯99円♪\n ジムビームハイボール何杯飲んでも1杯99円♪\n 芋焼酎『魔王』グラス1杯199円♪\n\n大画面TVで野球やサッカーなどスポーツ観戦もばっちり可能！\n換気や消毒など、三密対策はばっちり整えております！\n■創業昭和四十二年の伝統の炭火焼きを堪能■\n仕事帰りのちょい飲み大歓迎！本格炭火焼き鳥とビールで乾杯♪歓迎会や送別会向けの宴会コース多数\n\n■お得な飲み放題付きコースをご用意■\nたっぷり2時間飲み放題付きで3,500円～！",
          },
          code: {
            areacode: "AREA110",
            areaname: "関東",
            prefcode: "PREF13",
            prefname: "東京都",
            areacode_s: "AREAS2169",
            areaname_s: "品川（アトレ品川・インターシティ方面）",
            category_code_l: ["RSFST09000", ""],
            category_name_l: ["居酒屋", ""],
            category_code_s: ["RSFST09004", ""],
            category_name_s: ["居酒屋", ""],
          },
          budget: 3500,
          party: 3500,
          lunch: 3500,
          credit_card: "VISA,MasterCard,ダイナースクラブ,アメリカン・エキスプレス,JCB",
          e_money: "",
          flags: { mobile_site: 1, mobile_coupon: 1, pc_coupon: 1 },
        },
      ],
    ]);
  };

  // Assume only the support area Tokyo
  const pullDownElements = areaList
    .map((area) => {
      if (area.pref.pref_name === "東京都") {
        return area.areaname_l;
      }
      return null;
    })
    .filter(Boolean);
  const pullDownTag = [];
  Object.entries(pullDownElements).map(([key, value]) => {
    return pullDownTag.push(
      <MenuItem key={key} value={value}>
        {value}
      </MenuItem>
    );
  });

  return (
    <>
      <Grid item xs={12} className="search-page" style={{marginTop: "50px", marginBottom: "50px"}}>
        <Container maxWidth="md">
          <Box
            display="flex"
            justifyContent="center"
            className="search"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px 20px 0 0",
            }}
          >
            <form
              className="search-form"
              style={{
                marginTop: "20px",
                width: "90%",
              }}
            >
              <img
                src={Icon}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                }}
                alt="icon"
                role="presentation"
              />
              <Box className="key" display="block" justifyContent="center" my={3}>
                <TextField
                  id="area-field"
                  select
                  label="検索エリアを選択"
                  variant="outlined"
                  onChange={(e) => {
                    Object.entries(areaList).map(([, value]) => {
                      if (value.areaname_l === e.target.value) return setAreaCode(value.areacode_l);
                      return null;
                    });
                  }}
                  required
                  style={{
                    maxWidth: "500px",
                    width: "100%",
                  }}
                >
                  {pullDownTag}
                </TextField>
              </Box>
              <Box className="key" display="block" my={3}>
                <TextField
                  className="word"
                  label="除外ワードを入力"
                  type="search"
                  variant="outlined"
                  onChange={(e) => {
                    setExceptWord(e.target.value);
                  }}
                  style={{
                    maxWidth: "500px",
                    width: "100%",
                  }}
                />
              </Box>
            </form>
          </Box>

          <Box className="accordion" display="block" justifyContent="center" textAlign="center">
            <Accordion
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 0,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                詳細条件
              </AccordionSummary>
              <AccordionDetails
                style={{
                  display: "inline",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "rgba(255, 255, 255, 0)",
                }}
              >
                <div className="except">
                  <form
                    className="search-form"
                    style={{
                      marginTop: "20px",
                      width: "90%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <div className="key">
                      <TextField
                        className="word"
                        label="通常検索ワードを入力"
                        placeholder="通常検索ワードを入力"
                        variant="outlined"
                        onChange={(e) => {
                          setKeyword(e.target.value);
                        }}
                        style={{
                          maxWidth: "500px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div className="key">
                      <Box style={{ margin: "20px", display: "flex", justifyContent: "center", alignItems: "baseline" }}>
                        <TextField
                          className="budget"
                          select
                          label="予算下限"
                          onChange={(e) => {
                            Object.entries(budgetList).map(([, value]) => {
                              if (Number(value) === Number(e.target.value)) {
                                return setLowerBudget(value);
                              }
                              if (String(e.target.value) === "指定なし") {
                                return setLowerBudget(0);
                              }
                              return null;
                            });
                          }}
                          style={{
                            width: "40%",
                          }}
                        >
                          {pullDownBudget}
                        </TextField>
                        ～
                        <TextField
                          className="budget"
                          select
                          label="予算上限"
                          onChange={(e) => {
                            Object.entries(budgetList).map(([, value]) => {
                              if (Number(value) === Number(e.target.value)) {
                                return setUpperBudget(value);
                              }
                              if (String(e.target.value) === "指定なし") {
                                return setUpperBudget(999999);
                              }
                              return null;
                            });
                          }}
                          style={{
                            width: "40%",
                          }}
                        >
                          {pullDownBudget}
                        </TextField>
                      </Box>
                    </div>
                  </form>
                  <hr width="95%" />
                  <FormGroup>
                    <p>除外アレルギー食材</p>
                    <div className="tags">{allergiesItems}</div>
                    <p>除外苦手食材</p>
                    <div className="tags">{foodstuffItems}</div>
                    <p>除外利用シーン</p>
                    <div className="tags">{sceneItems}</div>
                    <p>除外設備</p>
                    <div className="tags">{facilityItems}</div>
                  </FormGroup>
                </div>
              </AccordionDetails>
            </Accordion>
            <Box
              display="flex"
              justifyContent="center"
              className="search"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "0px 0px 20px 20px",
              }}
            >
              <form
                className="search-form"
                style={{
                  marginTop: "20px",
                  width: "90%",
                  maxWidth: "500px",
                }}
              >
                <Box display="block" textAlign="center">
                  <Button
                    style={{
                      backgroundColor: "white",
                    }}
                    variant="contained"
                    className="submit-button"
                    size="large"
                    startIcon={<SearchIcon />}
                    onClick={() => {
                      getAllShops();
                    }}
                  >
                    お店を検索
                  </Button>
                </Box>
                <Box className="result-count" display="block" textAlign="right" my={3}>
                  検索結果 <font size="6">{countBefore}</font>件{countBefore === 100 && <font>以上</font>}
                </Box>
              </form>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
}

Search.propTypes = {
  allShops: PropTypes.string.isRequired,
  setAllShops: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
};
