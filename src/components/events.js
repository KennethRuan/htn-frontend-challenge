import React, {Component, useState} from 'react';
import { FaSearch, FaBackspace } from "react-icons/fa";
import {userContext} from './userProvider';
import axios from "axios";
import '../styles/events.css';
import '../styles/global.css';

class Events extends Component{

    
    constructor (props){
        super(props);
        this.state = {
            searchInput: "",
            viewRelatedEvents: false,
            relatedEvents: [],
            mainEventName: "",
            userPermission: "public",
            events:[],
        };

        // this.events = [
        //     {"id":1,"name":"Vonage API Workshop","event_type":"workshop","permission":"private","start_time":1610442000000,"end_time":1610443800000,"description":"A Nanoleaf Shapes Mini Triangle Smarter Kit will be awarded to each member of the winning team for Best Use of Vonage API. Vonage is a cloud communications platform that allows developers to integrate voice, video and messaging into their applications using their communication APIs. So whether you want to build video calls into your app, create a Facebook bot, or build applications on top of programmable phone numbers, Vonage has got you covered","speakers":[{"name":"Vonage"}],"public_url":"","private_url":"https://hopin.com/events/hack-the-north-2020","related_events":[2,3]},
        //     {"id":2,"name":"Rapid Prototyping with Flutter and Firebase","event_type":"tech_talk","permission":"public","start_time":1610442000000,"end_time":1610447400000,"description":"Ever need to make an app quickly, such as for a hackathon or prototype, but not know where to start? In this talk you will learn about Flutter, Google's cross-OS development platform, as well as Firebase, Google's Backend as a Service (BaaS) platform, and how they can be used to quickly take your ideas and turn them into beautiful and functional prototypes. We will discuss multiple useful widgets, third-party plugins, and how to implement various features of Firebase that can support your users. This talk will cover code implementations as well as theory.","speakers":[{"name":"Firebase"}],"public_url":"https://youtu.be/rgfezE92mog","private_url":"https://hopin.com/events/hack-the-north-2020","related_events":[1,3]},
        //     {"id":3,"name":"Microsoft API Workshop","event_type":"workshop","permission":"public","start_time":1610449200000,"end_time":1610452800000,"description":"The Azure prize is awarded to the team who makes the best use of Azure during this hackathon. The primary requirement is that your hack project includes Azure in some way.","speakers":[{"name":"Microsoft"}],"public_url":"https://youtu.be/M3GQs6fEjs4","private_url":"https://hopin.com/events/hack-the-north-2020","related_events":[1,2,4]},
        //     {"id":4,"name":"Hootsuite API Workshop","event_type":"workshop","permission":"public","start_time":1610449200000,"end_time":1610451000000,"description":"A Raspberry Pi 4 will be awarded to each member of the winning team who makes the best use of the Hootsuite API to improve how we communicate in today's connected world.","speakers":[{"name":"Hootsuite"}],"public_url":"https://youtu.be/lJ4uGA176HY","private_url":"https://hopin.com/events/hack-the-north-2020","related_events":[2,3,5]},
        //     {"id":5,"name":"Voiceflow API Workshop","event_type":"workshop","permission":"private","start_time":1610526600000,"end_time":1610530200000,"description":"Submit a project that uses Voiceflow – explain how Voiceflow helped to achieve the goal of your project","speakers":[{"name":"Voiceflow"}],"public_url":"","private_url":"https://hopin.com/events/hack-the-north-2020","related_events":[1,3,4]}
        // ];

        this.handleChange = this.handleChange.bind(this);
        this.setRelatedEvents = this.setRelatedEvents.bind(this);
        this.resetRelatedEvents = this.setRelatedEvents.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        const options = {
            method: 'POST',
            url: 'https://api.hackthenorth.com/v3/graphql',
            headers: {
                'content-type': 'application/json'
            },
            data: {
                query: `{
                    sampleEvents {
                      id
                      name
                      event_type
                      permission
                      start_time
                      end_time
                      description
                      speakers {
                        name
                      }
                      public_url
                      private_url
                      related_events
                    }
                  }
                  `
            }
        };
        axios
            .request(options)
            .then((response) => {
                // console.log(response.data.data.sampleEvents); // Response
                // console.log(typeof(response.data.data.sampleEvents));
                this.setState({
                    events: response.data.data.sampleEvents
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    convertTimestamp(timestamp){
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var date = new Date(timestamp);

        var weekday = days[date.getDay()];
        var month = months[date.getMonth()];
        var day = date.getDate();
        var hour = date.getHours() % 12;
        var ampm = date.getHours() <= 12 ? 'AM' : 'PM';
        var minute = "0" + date.getMinutes();

        var formatted = weekday + ', ' + month + ' ' + day + ' ' + hour + ':' + minute.slice(-2) + ' ' + ampm;
        return formatted;
    }

    handleChange(e){
        e.preventDefault();
        this.setState({
            searchInput: e.target.value
        });
    }

    locateEventById(id){
        // If the events are in order by id, this should work
        if (this.state.events[id-1].id === id){
            return this.state.events[id-1];
        }
        for (var i in this.state.events){
            if (this.state.events[i].id === id){
                return this.state.events[i];
            }
        }
        return [];
    }

    setRelatedEvents(id){
        let event = this.locateEventById(id);
        let relatedEvents = event.related_events;

        this.setState({
            viewRelatedEvents: true,
            relatedEvents: relatedEvents.concat([id]),
            mainEventName: event.name 
        });
    }

    deleteRelatedEvents(){
        this.setState({
            viewRelatedEvents: false,
            relatedEvents: [],
            mainEventName: "" 
        });
    }

    render(){
        let filteredEvents = this.state.events;
        if (this.state.viewRelatedEvents){
            filteredEvents = filteredEvents.filter((e, i)=>this.state.relatedEvents.includes(i+1));
        }

        if (this.state.searchInput.length > 0) {
            filteredEvents = filteredEvents.filter((event) => {
                return event.name.match(new RegExp(this.state.searchInput, "gi"));
            });
        }


        return(
            <div className="eventsWrapper">
                <div className="titleContainer">
                    <h1>Events <span> @ Hack The North</span></h1>
                </div>

                {/* 
                Search container HTML
                When related events is selected a bubble will appear under the search bar
                */}

                <div className="searchContainer">
                    <div className="searchbar">
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={this.handleChange}
                            value={this.state.searchInput} />
                        <FaSearch className="searchIcon"/>
                    </div>
                    <div className="filterBubbles">
                        {this.state.viewRelatedEvents ?
                            <div className="relatedEventBubble">
                                <p> Related to {this.state.mainEventName} </p>
                                <FaBackspace className="backspaceIcon" onClick={() => this.deleteRelatedEvents()}/>
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
                <div className="eventGrid">

                {/* 
                Displays events depending on whether or not the user is logged in
                */}

                <userContext.Consumer>
                    {({userPermission, login, logout}) => { return(
                        filteredEvents.map(event=>(
                            <div className="eventContainer" style={{display: (userPermission === "private" || event.permission === "public") ? "flex":"none"}}>
                               

                                <div className="eventLeft">
                                    <div className="eventTitle">
                                        <h1> {event.name} </h1>
                                    </div>
                                    <h2> Presented by 
                                        {event.speakers.map((speaker, index)=>(
                                            <b>{(index ? ', ':' ') + speaker.name}</b>
                                        ))}
                                    </h2>
                                    <p className="description">
                                        {event.description}
                                    </p>
                                </div>


                                <div className="eventRight">
                                    <div className="eventTags">
                                        <div className="eventType"> {event.event_type} </div>
                                        <div className="eventPermission"> {event.permission} </div>
                                    </div>
                                    <div className="times">
                                        <p> {this.convertTimestamp(event.start_time)} to</p>
                                        <p> {this.convertTimestamp(event.end_time)}</p>
                                    </div>
                                    <p id="relatedEvents" onClick={() => this.setRelatedEvents(event.id)}> View Related Events </p>
                                    <a href={event.permission === "public" ? event.public_url:event.private_url} id="eventLink"> Link to Event </a>
                                </div>
                            </div>
                        ))
                    )}}
                </userContext.Consumer>

                </div>
            </div>
        );
    }
}

export default Events;