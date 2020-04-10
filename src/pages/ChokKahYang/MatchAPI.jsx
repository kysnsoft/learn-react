import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import MatchList from './MatchList'
import Pagination from './Pagination'
import callApi from "../DotaAPI/FetchFunction"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import subDays from "date-fns/subDays";

import Modal from './Model'
import ItemChart from './ItemChart'
import Pie from '../DotaAPI/Pie'
import LineChart from '../Timothy/lineChart'

const date = new Date()
date.setDate(date.getDate() - 1)

function MatchAPI({ publicMatches, heros, clusters, itemsID, items }) {


    const [startDate, setStartDate] = useState(date)
    const [endDate, setEndDate] = useState(new Date())

    const [regions, setRegions] = useState({})

    const [currentPage, setCurrentPage] = useState(1)
    const [matchesPerPage] = useState(15)

    const indexOfLastMatch = currentPage * matchesPerPage
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
    const currentMatch = publicMatches.slice(indexOfFirstMatch, indexOfLastMatch)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        const fetchRegions = async () => {
            const region = await callApi('/constants/region')
            setRegions({
                ...region,
                5: "SE Asia", 8: "RUSSIA", 12: "CHINA", 13: "CHINA",
                17: "CHINA", 18: "CHINA", 20: "CHINA", 25: "CHINA"
            })
        }
        fetchRegions()
    }, []);

    return (

        <div className="m-3 clearfix">
            <div className="flex font-weight-bold text-light text-center">
                <div className="m-2 w-25">Match ID</div>
                <div className="m-2 w-25">Start Time</div>
                <div className="m-2 w-25">Duration</div>
                <div className="m-2 w-25">Result</div>
                <div className="m-2 w-50">Radiant</div>
                <div className="m-2 w-50">Dire</div>
            </div>
            {currentMatch.map(match =>
                (<MatchList key={match.match_id}
                    match={match} heros={heros} clusters={clusters} regions={regions}
                    itemsID={itemsID} items={items} />)
            )}

            <nav className="p-4 mr-4 float-left">
                <ul className="pagination ">
                    <Popup modal trigger={
                        <button className="btn btn-dark m-1">
                            Pie Chart
                        </button>}>
                        {close => <Pie info={currentMatch} heros={heros} close={close} />}
                    </Popup>

                    <Popup modal trigger={
                        <button className="btn btn-dark m-1">
                            Bar Chart
                        </button>}>
                        {close => <Modal close={close} />}
                    </Popup>

                    <Popup modal trigger={
                        <button className="btn btn-dark m-1">
                            Statistic (Line)
                        </button>}>
                        {close => <LineChart close={close} />}
                    </Popup>

                    <Popup modal trigger={
                        <button className="btn btn-dark m-1">
                            Items
                        </button>}>
                        <ItemChart items={items} startDate={startDate} endDate={endDate} />
                    </Popup>
                    <li>
                        <DatePicker className="m-1"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={subDays(new Date(), 14)}
                            maxDate={new Date()} />
                    </li>
                    <li>
                        <DatePicker className="m-1"
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            minDate={subDays(new Date(), 13)}
                            maxDate={new Date()} />
                    </li>
                </ul>

            </nav>


            <Pagination matchesPerPage={matchesPerPage} totalMatches={publicMatches.length} paginate={paginate} />
        </div>
    )


}

export default MatchAPI
