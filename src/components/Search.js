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
    const items = [];
    const [state, setState] = React.useState({
        checkedA: {
            word: "辛い",
            check: false
        },
        checkedB: {
            word: "うるさい",
            check: false
        },
        checkedC: {
            word: "苦い",
            check: false
        },
        checkedD: {
            word: "臭い",
            check: false
        },
        checkedE: {
            word: "カップル向け",
            check: false
        },
    });

    const [exceptWord, setExceptWord] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [keyword, setKeyword] = useState("");
    const { allShops, setAllShops, setCurrentView } = props;

    const baseUrl = "https://api.except-app.com/shops";

    const [countBefore, setCountBefore] = useState(0);
    const [countAfter, setCountAfter] = useState(0);

    const handleChange = (event) => {
        setState({ ...state, [event.target.id]: {word: event.target.name, check: event.target.checked }});
    };
    Object.entries(state).map(([key, value]) => {
        return items.push(
            <FormControlLabel
            control={<BlackCheckbox checked={value.check} onChange={handleChange} id={key} name={value.word} key={key}/>}
            label={value.word}
            key={key}
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




    return (
        <div className="search-page">
            <div className="search">
                <p className="top-message"/>

                <div>
                    <button
                        type="submit"
                        className="submit-button"
                        onClick={() => {
                            getAllShops();
                        }}
                    >
                        <span>お店を検索</span>
                    </button>

                    <div className="result-count">
                        検索結果 <font size="6">{countBefore}</font>件
                        {countBefore === 100 && (
                            <font>
                                以上
                            </font>
                        )}
                    </div>

                </div>
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
                            placeholder="カンマ区切りでフリーワードを入力"
                            onChange={(e) => {
                                setKeyword(e.target.value);
                            }}
                        />

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
                                    placeholder="カンマ区切りで除外ワードを入力"
                                    onChange={(e) => {
                                        setExceptWord(e.target.value);
                                    }}
                                />
                            </p>
                            <FormGroup row>
                                    {items}
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