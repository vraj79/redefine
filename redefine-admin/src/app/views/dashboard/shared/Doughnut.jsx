import React from 'react'
import { useTheme } from '@mui/system'
import ReactEcharts from 'echarts-for-react'
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config';

const DoughnutChart = ({ height, color = [] }) => {
    const theme = useTheme()
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        const { data } = await axiosInstance.get(`project/view2`)
        console.log("dashboard projects");
        console.log(data);
        setProjects(data)
    }
    const yetToStart = projects.filter((x)=>
        x.status == "1"
    );
    const closed = projects.filter((x)=>
        x.status == "5"
    );
    const inProgress = projects.filter((x)=>
        x.status == "2"
    );
    const cancelled = projects.filter((x)=>
        x.status == "4"
    );
    const executed = projects.filter((x)=>
        x.status == "7"
    );
    const partlyExecuted = projects.filter((x)=>
        x.status == "6"
    );
    const postponed = projects.filter((x)=>
        x.status == "3"
    );

    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],

        series: [
            {
                name: 'Traffic Rate',
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center', // shows the description data to center, turn off to show in right side
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto',
                        },
                        formatter: '{a}',
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                            // color: "rgba(15, 21, 77, 1)"
                        },
                        formatter: '{b} \n{c} ({d}%)',
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: [
                    {
                        value: yetToStart.length,
                        name: 'Yet to Start',
                        itemStyle: {color: "rgb(183,183,183)"},
                    },
                    {
                        value: closed.length,
                        name: 'Closed',
                        itemStyle: {color: "rgb(0,0,255)"},
                    },
                    {   value: inProgress.length, 
                        name: 'In Progress',
                        itemStyle: {color: "rgb(106,168,79)"}, 
                    },
                    {
                        value: cancelled.length,
                        name: 'Cancelled',
                        itemStyle: {color: "rgb(255,0,0)"},
                    },
                    {
                        value: executed.length,
                        name: 'Executed',
                        itemStyle: {color: "rgb(241,194,50)"},
                    },
                    {   
                        value: partlyExecuted.length, 
                        name: 'Partly Executed', 
                        itemStyle: {color: "rgb(147,196,125)"}, 
                    },
                    { 
                        value: postponed.length, 
                        name: 'Postponed',
                        itemStyle: {color: "rgb(255,109,1)"}, 
                    },
                    // { 
                    //     value: 31, 
                    //     name: 'Lost to Competition',
                    //     itemStyle: {color: "red"},
                    // },
                ],
                // itemStyle: {
                //     emphasis: {
                //         shadowBlur: 10,
                //         shadowOffsetX: 0,
                //         shadowColor: 'rgba(0, 0, 0, 0.5)',
                //     },
                // },
            },
        ],
    }

    return (
        <ReactEcharts
            style={{ height: height }}
            option={{
                ...option,
                color: [...color],
            }}
        />
    )
}

export default DoughnutChart
