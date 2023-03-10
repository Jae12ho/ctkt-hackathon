import { useEffect, useState } from "react";
import DayBox from "./dayBox";
import Image from "next/image";
import { handleClientScriptLoad } from "next/script";
import axios from 'axios';

export default function Calendar() {
    const [array1, setArray1] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [array2, setArray2] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [array3, setArray3] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [array4, setArray4] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [array5, setArray5] = useState([0, 0, 0, 0, 0, 3, 0]);
    const [array6, setArray6] = useState([0, 0, 0, 0, 0, 3, 0]);

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [isOver, setIsOver] = useState(false);
    const [week, setWeek] = useState(['일', '월', '화', '수', '목', '금', '토']);
    const [detailData, setDetailData] = useState({
        week: "",
        day: "",
        info: []
    });
    const [isDetail, setIsDetail] = useState(false);

    const [FLday, setFLday] = useState({
        firstDay: '',
        lastDay: '',
    });

    const makeCalendar = (year, month) => {
        const date = new Date(year, month, 1);
        
        const firstDay = new Date(date.setDate(1)).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        console.log(firstDay, lastDay)

        setFLday({firstDay, lastDay});
        setIsOver(firstDay === 5 && lastDay === 31 || firstDay >= 6 && lastDay >= 30);
    }

    useEffect(() => {
        makeCalendar(year, month);

        const params = {
            user_id: 1,
            year: year,
            month: month + 1
        };
        axios.get('https://api.likelionerica.com/hellc/calendar/', { params }).then(res => {
            console.log(res.data.result);
            let tmp = [];
            for(let i = 0; i < FLday.firstDay; i++) {
                tmp.push(0);
            }
            for (let i = 0; i < 7 - FLday.firstDay; i++) {
                if (!(res.data.result[i].constructor === Object && Object.keys(res.data.result[i]).length === 0)) {
                    const time = res.data.result[i].total_time;
                    tmp.push(time < 10 ? 1 : time < 20 ? 2 : 3);
                } else {
                    tmp.push(0);
                }
            }
            setArray1(tmp);
            console.log(array1)

            tmp = [];
            for (let i = 7 - FLday.firstDay; i < 14 - FLday.firstDay; i++) {
                if (!(res.data.result[i].constructor === Object && Object.keys(res.data.result[i]).length === 0)) {
                    const time = res.data.result[i].total_time;
                    tmp.push(time < 10 ? 1 : time < 20 ? 2 : 3);
                } else {
                    tmp.push(0);
                }
            }
            setArray2(tmp);
            console.log(array2)

            tmp = [];
            for (let i = 14 - FLday.firstDay; i < 21 - FLday.firstDay; i++) {
                if (!(res.data.result[i].constructor === Object && Object.keys(res.data.result[i]).length === 0)) {
                    const time = res.data.result[i].total_time;
                    tmp.push(time < 10 ? 1 : time < 20 ? 2 : 3);
                } else {
                    tmp.push(0);
                }
            }
            setArray3(tmp);
            console.log(array3)

            tmp = [];
            for (let i = 21 - FLday.firstDay; i < 28 - FLday.firstDay; i++) {
                if (!(res.data.result[i].constructor === Object && Object.keys(res.data.result[i]).length === 0)) {
                    const time = res.data.result[i].total_time;
                    tmp.push(time < 10 ? 1 : time < 20 ? 2 : 3);
                } else {
                    tmp.push(0);
                }
            }
            setArray4(tmp);
            console.log(array4)

            tmp = [];
            // for (let i = 28 - FLday.firstDay; i < FLday.lastDay; i++) {
            //     if (!(res.data.result[i].constructor === Object && Object.keys(res.data.result[i]).length === 0)) {
            //         const time = res.data.result[i].total_time;
            //         tmp.push(time < 10 ? 1 : time < 20 ? 2 : 3);
            //     } else {
            //         tmp.push(0);
            //     }
            // }
            // setArray5(tmp);
            // console.log(array5)

            // tmp = [];
            
        });
        
    }, [year, month]);

    const prevMonth = () => {
        if (month > 0) {
            setMonth(month - 1);
        } else {
            setMonth(11);
            setYear(year - 1);
        }
    }

    const nextMonth = () => {
        if (month < 11) {
            setMonth(month + 1);
        } else {
            setMonth(0);
            setYear(year + 1);
        }
    }

    const handleDetail = (index, day) => {
        console.log('cldickl')
        if (day) {
            const params = {
                user_id: 1,
                year: year,
                month: month + 1
            };
            axios.get('https://api.likelionerica.com/hellc/calendar/', { params }).then(res => {
                const obj = res.data.result[day - 1];

                if (!(obj.constructor === Object && Object.keys(obj).length === 0)) {
                    setDetailData({
                        week: week[index],
                        day: day,
                        info: res.data.result[day - 1].log,
                    });
                } else {

                }
                
            });

            setIsDetail(true);
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center w-[366px] bg-white border-1 rounded-xl shadow-[0_-4px_8px_rgba(0,0,0,0.06)]">
            <div className="p-3 pb-10">
                <div className="flex justify-between">
                    <h1 className="font-extrabold text-[19px] my-2">{year}. {month + 1}.</h1>
                    <div className="flex justify-center items-center">
                        <button className="mr-1" onClick={prevMonth}><Image src="/left.svg" width="24px" height="12px" alt="left"/></button>
                        <button className="ml-1" onClick={nextMonth}><Image src="/right.svg" width="24px" height="12px" alt="right"/></button>
                    </div>
                </div>
                <div className="flex w-[327px] justify-between p-1 text-[12px] text-gray-500 text-center">
                    {week.map((w, index) => (<div key={index} className="w-[25px]">{w}</div>))}
                </div>
                <div>
                    <div className="flex w-[327px] justify-between p-1">
                        {array1.map((n, index) => (
                            <DayBox key={index} n={n} day={(index < FLday.firstDay ? "" : index - FLday.firstDay + 1)} handleDetail={handleDetail} index={index} />
                        ))}
                    </div>
                    <div className="flex w-[327px] justify-between p-1">
                        {array2.map((n, index) => (
                            <DayBox key={index} n={n} day={index + 8 - FLday.firstDay} handleDetail={handleDetail} index={index} />
                        ))}
                    </div>
                    <div className="flex w-[327px] justify-between p-1">
                        {array3.map((n, index) => (
                            <DayBox key={index} n={n} day={index + 15 - FLday.firstDay} handleDetail={handleDetail} index={index} />
                        ))}
                    </div>
                    <div className="flex w-[327px] justify-between p-1">
                        {array4.map((n, index) => (
                            <DayBox key={index} n={n} day={index + 22 - FLday.firstDay} handleDetail={handleDetail} index={index} />
                        ))}
                    </div>
                    <div className="flex w-[327px] justify-between p-1">
                        {array5.map((n, index) => (
                            <DayBox key={index} n={n} day={index + 29 - FLday.firstDay <= FLday.lastDay ? index + 29 - FLday.firstDay : ""} handleDetail={handleDetail} index={index} />
                        ))}
                    </div>
                    {isOver && (
                    <div className="flex w-[327px] justify-between p-1">
                        {array6.map((n, index) => (
                            <DayBox key={index} n={n} day={index + 36 - FLday.firstDay <= FLday.lastDay ? index + 36 - FLday.firstDay : ""} handleDetail={handleDetail} index={index} />
                        ))}
                    </div>
                    )}
                </div>
                {isDetail && (<div>
                    <div className="p-1 mt-6 mb-2 font-extrabold text-[18px]">{detailData.day}일 {"("}{detailData.week}{")"}</div>
                    {detailData.info.map((item, index) => (
                        <div key={index} className="px-3 py-2 mt-1 mb-3 h-[60px] w-full bg-white rounded-[7px] border-[0.5px_solid_#D7D7D7] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
                            <div className="flex justify-between">
                                <li className="text-[14px] font-bold">{item.gym_name}</li>
                                <p className="text-[14px] font-bold text-[#A3A3A3]">{item.start_time + " - " + item.end_time}</p>
                            </div>
                            <div className="flex justify-around">
                                {item.is_chest && (<div className="flex justify-center items-center text-[12px] font-bold rounded-[5px] bg-[#D6E5EE] w-[55px] h-[22px] my-1">가슴</div>)}
                                {item.is_back && (<div className="flex justify-center items-center text-[12px] font-bold rounded-[5px] bg-[#DEECDC] w-[55px] h-[22px] my-1">등</div>)}
                                {item.is_leg && (<div className="flex justify-center items-center text-[12px] font-bold rounded-[5px] bg-[#FAE3DE] w-[55px] h-[22px] my-1">하체</div>)}
                                {item.is_shoulder && (<div className="flex justify-center items-center text-[12px] font-bold rounded-[5px] bg-[#E2DEFA] w-[55px] h-[22px] my-1">어깨</div>)}
                                {item.is_arm && (<div className="flex justify-center items-center text-[12px] font-bold rounded-[5px] bg-[#FFDDBD] w-[55px] h-[22px] my-1">팔</div>)}
                            </div>
                        </div>
                    ))

                    }
                </div>)}
            </div>
        </div>
    </div>
    )
}