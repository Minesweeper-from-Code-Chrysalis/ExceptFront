import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/search.css";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { indigo } from '@material-ui/core/colors';

import areaList from "../data/area.json";

const BlackCheckbox = withStyles({
    root: {
        color: indigo[400],
        '&$checked': {
            color: indigo[400],
        },
    },
    checked: {},
})(Checkbox);

const Accordion = withStyles({
    root: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56
        }
    },
    content: {
        "&$expanded": {
            margin: "12px 0"
        }
    },
    expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);


export default function Search(props) {
    const sceneItems = [];
    const allergiesItems = [];
    const foodstuffItems = [];
    const facilityItems = [];
    const [sceneState, setSceneState] = React.useState({
        sceneCheckedA: {
            word: "飲み会",
            check: false
        },
        sceneCheckedB: {
            word: "デート",
            check: false
        },
        sceneCheckedC: {
            word: "子連れ",
            check: false
        },
        sceneCheckedD: {
            word: "学生",
            check: false
        },
        sceneCheckedE: {
            word: "高級",
            check: false
        },
    });
    const [allergiesState, setAllergiesState] = React.useState({

        AllergiesCheckedA: {
            word: "小麦",
            check: false
        },
        AllergiesCheckedB: {
            word: "乳",
            check: false
        },
        AllergiesCheckedC: {
            word: "卵",
            check: false
        },
        AllergiesCheckedD: {
            word: "そば",
            check: false
        },
        AllergiesCheckedE: {
            word: "海老",
            check: false
        },
        AllergiesCheckedF: {
            word: "蟹",
            check: false
        },
        AllergiesCheckedG: {
            word: "ナッツ",
            check: false
        },
    });

    const [foodstuffState, setFoodstuffState] = React.useState({

        foodstuffCheckedA: {
            word: "野菜",
            check: false
        },
        foodstuffCheckedB: {
            word: "トマト",
            check: false
        },
        foodstuffCheckedC: {
            word: "ナス",
            check: false
        },
        foodstuffCheckedD: {
            word: "にんにく",
            check: false
        },
        foodstuffCheckedE: {
            word: "パクチー",
            check: false
        },
        foodstuffCheckedF: {
            word: "ピーマン",
            check: false
        },
    });

    const [facilityState, setFacilityState] = React.useState({

        facilityCheckedA: {
            word: "エアコン",
            check: false
        },
        facilityCheckedB: {
            word: "ビュッフェ",
            check: false
        },
        facilityCheckedC: {
            word: "座敷",
            check: false
        },
        facilityCheckedD: {
            word: "カウンター",
            check: false
        },
        facilityCheckedE: {
            word: "狭い",
            check: false
        },
    });
    const [exceptWord, setExceptWord] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [lowBudget, setLowBudget] = useState(0);
    const [highBudget, setHighBudget] = useState(999999);
    const [keyword, setKeyword] = useState("");
    const { allShops, setAllShops, setCurrentView } = props;
    const budgetList = [500,800,1000,1500,2000,3000,4000,5000,7000,10000,20000,30000];
    const pullDownBudget=[];
    pullDownBudget.push(<option key="指定なし">指定なし</option>);
    Object.entries(budgetList).map(([key, value]) => {
        return pullDownBudget.push(<option key={key}>{value}</option>);
    });

    const baseUrl = "https://api.except-app.com/shops";

    const [countBefore, setCountBefore] = useState(0);
    const [countAfter, setCountAfter] = useState(0);

    const handleChange = (event) => {
        setSceneState({ ...sceneState, [event.target.id]: { word: event.target.name, check: event.target.checked } });
    };
    Object.entries(sceneState).map(([key, value]) => {
        return sceneItems.push(
            <FormControlLabel
                control={<BlackCheckbox checked={value.check} onChange={handleChange} id={key} name={value.word} />}
                label={value.word}
            />
        );
    });

    const allergiesHandleChange = (event) => {
        setAllergiesState({ ...allergiesState, [event.target.id]: { word: event.target.name, check: event.target.checked } });
    };
    Object.entries(allergiesState).map(([key, value]) => {
        return allergiesItems.push(
            <FormControlLabel
                control={<BlackCheckbox checked={value.check} onChange={allergiesHandleChange} id={key} name={value.word} />}
                label={value.word}
            />
        );
    });

    const foodstuffHandleChange = (event) => {
        setFoodstuffState({ ...foodstuffState, [event.target.id]: { word: event.target.name, check: event.target.checked } });
    };
    Object.entries(foodstuffState).map(([key, value]) => {
        return foodstuffItems.push(
            <FormControlLabel
                control={<BlackCheckbox checked={value.check} onChange={foodstuffHandleChange} id={key} name={value.word} />}
                label={value.word}
            />
        );
    });

    const facilityHandleChange = (event) => {
        setFacilityState({ ...facilityState, [event.target.id]: { word: event.target.name, check: event.target.checked } });
    };
    Object.entries(facilityState).map(([key, value]) => {
        return facilityItems.push(
            <FormControlLabel
                control={<BlackCheckbox checked={value.check} onChange={facilityHandleChange} id={key} name={value.word} />}
                label={value.word}
            />
        );
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
        let url = `${baseUrl}?areaCode=${areaCode}`;

        if (exceptWord.length > 0) {
            url = `${url}&exceptWord=${encodeURIComponent(exceptWord)}`;
        }
        if (keyword.length > 0) {
            url = `${url}&keyword=${encodeURIComponent(keyword)}`;
        }
        const preData = await fetch(url);
        const result = await preData.status;

        if (result === 400) {
            setCurrentView("Error");
        } else {
            const data = await fetch(url).then((res) => res.json());
            setAllShops([data]);
        }
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
        return pullDownTag.push(<option key={key}>{value}</option>);
    });


    console.log(lowBudget);
    
    console.log(highBudget);

    return (
        <div className="search-page">
            <div className="search">
                <p className="top-message" />
                <form className="search-form">

                    <div className="key">
                        {" "}
                        <select
                            className="area"
                            onChange={(e) => {
                                Object.entries(areaList).map(([, value]) => {
                                    if (value.areaname_l === e.target.value)
                                        return setAreaCode(value.areacode_l);
                                    return null;
                                });
                            }}
                        >
                            <option hidden>エリアを選択</option>
                            {pullDownTag}
                        </select>

                        <input
                            type="text"
                            className="word"
                            label="input3"
                            placeholder="検索ワードを入力"
                            onChange={(e) => {
                                setKeyword(e.target.value);
                            }}
                        />

                    </div>
                    <div className="key">
                    <select
                            className="budget"
                            onChange={(e) => {
                                Object.entries(budgetList).map(([, value]) => {
                                    if (Number(value) === Number(e.target.value)){
                                        return setLowBudget(value);
                                    }
                                    if (String(e.target.value) === "指定なし"){
                                        return setLowBudget(0);
                                    }
                                    return null;
                                });
                            }}
                        >
                            <option hidden>予算下限</option>
                            {pullDownBudget}
                        </select>
                        ～
                        <select
                            className="budget"
                            onChange={(e) => {
                                Object.entries(budgetList).map(([, value]) => {
                                    if (Number(value) === Number(e.target.value)){
                                        return setHighBudget(value);
                                    }
                                    if (String(e.target.value) === "指定なし"){
                                        return setHighBudget(999999);
                                    }
                                    return null;
                                });
                            }}
                        >
                            <option hidden>予算上限</option>
                            {pullDownBudget}
                        </select>
                    </div>
                    <div>
                        <p>
                            <button
                                type="submit"
                                className="submit-button"
                                onClick={() => {
                                    getAllShops();
                                }}
                            >
                                <span>お店を検索</span>
                            </button>
                        </p>
                        <div className="result-count">
                            <p>
                                検索結果 <font size="6">{countBefore}</font>件
                        {countBefore === 100 && (
                                    <font>
                                        以上
                                    </font>
                                )}
                            </p>
                        </div>

                    </div>


                </form>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className="accordion-summary">
                            除外詳細条件
                </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="except">
                            <p>
                                除外ワード：
                                <input
                                    type="text"
                                    className="word"
                                    label="input1"
                                    placeholder="除外ワードを入力"
                                    onChange={(e) => {
                                        setExceptWord(e.target.value);
                                    }}
                                />
                            </p>
                            <FormGroup>
                                <p>アレルギー食材</p>
                                <div className="tags">
                                    {allergiesItems}
                                </div>
                                <p>苦手食材</p>
                                <div className="tags">
                                    {foodstuffItems}
                                </div>
                                <p>利用シーン</p>
                                <div className="tags">
                                    {sceneItems}
                                </div>
                                <p>設備</p>
                                <div className="tags">
                                    {facilityItems}
                                </div>

                            </FormGroup>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>

        </div>
    );
}

Search.propTypes = {
    allShops: PropTypes.string.isRequired,
    setAllShops: PropTypes.func.isRequired,
    setCurrentView: PropTypes.func.isRequired,
};