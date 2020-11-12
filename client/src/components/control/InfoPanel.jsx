import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'

import axios from 'axios'

import {
    List,
    Header,
    Button,
} from 'semantic-ui-react'

import { 
    getLatestRatesRequest, 
    getLatestRatesSuccess, 
    getLatestRatesFailure
} from '../../redux'

import codes from './countryCodes'


const FIXER_IO_API_KEY = process.env.REACT_APP_FIXER_IO_API_KEY


const InfoPanel = props => {
    const { 
        country_data, 
        getLatestRatesRequest, 
        getLatestRatesSuccess, 
        getLatestRatesFailure 
    } = props

    const [countryName, setCountryName] = useState('')
    const [code, setCode] = useState('')

    useEffect(() => {
        console.log(country_data)
        console.log(codes)
        setCountryName(country_data.display_name)
    }, [country_data])

    useEffect(() => {
        if (countryName !== '' && Object.values(codes).includes(countryName))  {
            let getKey = Object.keys(codes)[Object.values(codes).indexOf(countryName)]
            console.log(getKey)
            setCode(getKey)
        }
    }, [countryName])

    const handleClickGetLatest = () => {
        const baseURL = 'http://data.fixer.io/api/'
        const endpoint = 'latest'
        const accessKey = `?access_key=${FIXER_IO_API_KEY}`
        const baseCurrency = `&base=${code}`
        getLatestRatesRequest()
        axios.get(`${baseURL}${endpoint}${accessKey}`)
            .then(response => {
                getLatestRatesSuccess(response)
                console.log(response)
            })
            .catch(error => {
                getLatestRatesFailure(error)
                console.log(error)
            })
    }


    return (
        <>
            <Header as="h5">Country Info:</Header>
            <List>
                <List.Item>
                    <List.Icon name='location arrow' />
                    <List.Content>{countryName ? countryName : 'Country Name'}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='currency' />
                    <List.Content>{countryName ? `Base: 1 ${code}` : 'Base'}</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='marker' />
                    <List.Content><Button size='mini' onClick={handleClickGetLatest} >Get Latest Rates</Button></List.Content>
                </List.Item>
            </List>
        </>
    )
}


const mapStateToProps = state => {
    return {
        country_data: state.getCountry.country_data,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getLatestRatesRequest: () => dispatch(getLatestRatesRequest()),
        getLatestRatesSuccess: response => dispatch(getLatestRatesSuccess(response)),
        getLatestRatesFailure: error => dispatch(getLatestRatesFailure(error)),   
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel)