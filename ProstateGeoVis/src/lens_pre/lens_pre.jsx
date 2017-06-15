import React, { Component } from 'react'
import styles from './lens_pre.css';

import * as d3 from 'd3'
import Color from 'color'

import { municipalities } from 'services/municipalities'
import { citizens } from 'services/citizens'
//import { birthPlace } from 'services/variables'
import { birthDate } from 'services/variables'
import { incGroup } from 'services/variables'
import { birthPlace } from 'services/variables'
import { diagnosisCause } from 'services/variables'


class PreLens extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      subject:"",
      allData:[],
      municipalityData:[],
      twoMunicipalities: [],
    }
    this.makeCSV = this.makeCSV.bind(this)
    this.choseSubject = this.choseSubject.bind(this)
    this.sortMunicipality = this.sortMunicipality.bind(this)
    this.twoMunicipalities = this.twoMunicipalities.bind(this)

    this.margin = {top: 20, right: 20, bottom: 100, left: 20}
    this.width = 400 - this.margin.left - this.margin.right
    this.height = 600 - this.margin.top - this.margin.bottom;

      // set the ranges
  this.x = d3.scaleBand()
            .range([0, this.width])
            .padding(0.1);
  this.y = d3.scaleLinear()
            .range([this.height, 0])

  }

  makeCSV() {
  var gusseCSV = require("../../dataset/gusse_ar_samst.csv");
    d3.csv(gusseCSV, (data) => {
      this.countAmount(data)
    });
  }

  countAmount(d){
    this.setState({allData:d})
    let biggestValue = 0
    this.cleanChart()
    let data = []
    for (let i = 0; i < municipalities.length; i++) {
      let occurances = d.filter(function(val){
        return val["lkf_psa"] === municipalities[i];
      }).length

      console.log(occurances);

      data.push({
        Municipality: municipalities[i],
        count: occurances/citizens[i],
      });
      
      biggestValue += occurances/citizens[i]
    
    }

    const mapData = {}
    for (var i in data) {
      let color = Color.rgb(0, data[i].count * 500, 0)
      mapData[ data[i].Municipality.toLowerCase() ] = {"color": String(color.rgb().hex()),
          "value": data[i].count}
    }

    console.log("MAPDATA", mapData);
    this.props.colorMap(mapData)
    this.updateBarchart(1, data, 1, "rgb(100,100,100)")

  }



  updateBarchart(biggestValue, data, range,color) {   
    let stateData = data
    this.x.domain(data.map(function(d) { return d.Municipality; }));
    this.y.domain([0, range]); 
    let x = this.x;
    let y = this.y;
    let height = this.height;
    let width = this.width;
    let margin = this.margin;
    let barWidth = 0.5

    let colorNumber = 0
    if (color==="#F2385A"){
       colorNumber = x.bandwidth() * 0.5
    }

    if(range === 0.01) {
      barWidth = 1
    }

    var svg = d3.select("#gusseChartMuni").attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

     svg.selectAll(".bar")
        .data(stateData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
          return x(d.Municipality) + colorNumber;
        })

        .attr("width", x.bandwidth()*barWidth)
        .attr("y", function(d) { return y((d.count/biggestValue)); })
        .transition()
        .duration(300)
        .attr("height", function(d) { return height - y((d.count/biggestValue)); })
        .style("fill", color)

        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
          .selectAll("text")
                .attr("y", 0)
                .attr("x", 10)
                .attr("dy", ".35em")
                .attr("transform", "rotate(90)")
                .style("text-anchor", "start");


    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(10, "%"))

        d3.select("#municipality1")
        .style("color","#F5A503")
          // color="#F5A503"



        d3.select("#municipality2")
        .style("color","#F2385A")
          // color ="#"

  }

  subjectCount(id,oneMunicipality,color){
      let biggestValue = 0
      let d = oneMunicipality;
      let data = []

      if(this.state.subject === "birth_date"){

                for (let i = 0; i < birthDate.length; i++) {
                  let occurances = d.filter(function(val){
              return val["birth_date"].substring(0,3) === birthDate[i].substring(0,3);
            }).length;

    data.push({
      Municipality: birthDate[i],
      count: occurances,
    });
    biggestValue += occurances
    }
  }
  else if (this.state.subject ==="inc_grp"){
    for (let i = 0; i < incGroup.length; i++) {

                  let occurances = d.filter(function(val){
              return val["inc_grp"] === incGroup[i];
            }).length;

    data.push({
      Municipality: incGroup[i],
      count: occurances,
    });
    biggestValue += occurances;
    }}

      else if (this.state.subject === "birth_place"){
    for (let i = 0; i < incGroup.length; i++) {

                  let occurances = d.filter(function(val){
              return val["birth_place"] === birthPlace[i];
            }).length;

    data.push({
      Municipality: birthPlace[i],
      count: occurances,
    });
    biggestValue += occurances;
    }}

    else if (this.state.subject === "diagnosis_cause"){
    for (let i = 0; i < diagnosisCause.length; i++) {

                  let occurances = d.filter(function(val){
              return val["diagnosis_cause"] === diagnosisCause[i];
            }).length;

    data.push({
      Municipality: diagnosisCause[i],
      count: occurances,
    });
    biggestValue += occurances;
    }



  }

    this.updateBarchart(biggestValue,data,1,color)
  }

  cleanChart(){
    var myNode = document.getElementById("gusseChartMuni");
    myNode.innerHTML = '';

  }

  sortMunicipality(twoM){
    this.cleanChart();
    let color = "";

    for (let i in twoM){

        let d = this.state.allData;
              var oneMunicipality = d.filter(function(val){
          return val["lkf_psa"].toLowerCase() === twoM[i];
        })
        if(i == 0) {
          // color="#99cc66"
          color="#F5A503"
        }
        else{
          // color ="#006633"
          color ="#F2385A"
        }
        this.setState({municipalityData: oneMunicipality});
        this.subjectCount(twoM[i],oneMunicipality,color);
    }

  }

  choseSubject(event){
    d3.selectAll(".btn")
      .style("opacity","1");

    d3.select("#"+event.target.id)
      .style("opacity","0.7")

    let e = event.target.id
    this.setState({subject: event.target.id},function(){
        this.sortMunicipality(this.state.twoMunicipalities);
    }.bind(this));

  }

  componentDidMount() {
    this.makeCSV();
   }

  componentWillReceiveProps(newProps) {
      this.twoMunicipalities(newProps);
  }

   twoMunicipalities(newProps){
    let regionsArr = [...newProps.regions]

    if (regionsArr.length > 2 ){
      regionsArr.shift()
      newProps.setActiveRegions(new Set(regionsArr));

    }

    this.setState({twoMunicipalities: regionsArr},function(){
        this.sortMunicipality(this.state.twoMunicipalities);
    }.bind(this));
    let twoMunicipalities = this.state.twoMunicipalities
    this.sortMunicipality(twoMunicipalities)

   }

   turnVariableToText(){
    if (this.state.subject==="inc_grp"){
      return "Income group"
    }else if(this.state.subject==="birth_date"){
      return("Birth date")
    }else if(this.state.subject==="birth_place"){
      return("Place of birth")
    }else if(this.state.subject==="birth_place"){
      return("Place of birth")
    }else if(this.state.subject==="diagnosis_cause"){
      return("Diagnosis cause")
    } else {
      return "PSA Test Overview"
    }

   }

  render() {
    return (
      <div id="preLens">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
                <div className="btn-group" data-toggle="buttons" id="buttonRow">
                  <button className="btn btn-default unicorn-button overlook" onClick={this.makeCSV}>overlook</button>
                  <button className="btn btn-default unicorn-button subjectButton" id="birth_date" onClick={this.choseSubject}>birth date</button>
                  <button className="btn btn-default unicorn-button subjectButton" id="inc_grp" onClick={this.choseSubject}>income group</button>
                  <button className="btn btn-default unicorn-button subjectButton" id="birth_place" onClick={this.choseSubject}>birth place</button>
                  <button className="btn btn-default unicorn-button subjectButton" id="diagnosis_cause" onClick={this.choseSubject}>diagnosis cause</button>
                  <button className="btn btn-default unicorn-button reset" onClick={this.cleanChart}>Reset</button>
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h1 id="subject">{this.turnVariableToText()}</h1>
              <h4>Choose two regions in the map to compare</h4>
            </div>
          </div>
          <div className="row">
            <h1 className="gusse-muni-names col-sm-6" id="municipality1">{this.state.twoMunicipalities[0]}</h1>
            <h1 className="gusse-muni-names col-sm-6" id="municipality2">{this.state.twoMunicipalities[1]}</h1>
          </div>
          <div className="row chartholder">
            <div className="col-sm-12">
              <svg id="gusseChartMuni"></svg>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <svg id="gusseChartICG"></svg>
            </div>
          </div>
        </div>
      </div>
    )
  }



}

export default PreLens
