import React, { Component } from 'react'
import './lens.css'
const d3 = require('d3')
const file = require('../../dataset/first_psa_and_death.csv')
const color = require('color');

class Lens extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
		this.renderGraph = this.renderGraph.bind(this)
	}

	render() {
		return (
			<div className="Lens">
			
				{this.renderGraph()}

			</div>
		);
	}

	test() {
		console.log("Hello World!")
	}

	renderGraph() {
		var width = 600,
			height = 600;

		var parseTime = d3.timeParse("%Y-%m-%d");

		// Data file, pre-processing, callback
		d3.csv(file, function (d) {
			d.psa_total = 25 * Math.log(d.psa_total);
			d.psadate = parseTime(d.psadate);
			return d;
		}, function(error, patients) {
			console.log('Loaded patients')

			var svg = d3.select(".Lens")
				.append("svg:svg")
				.attr("class", "canvas")
				.attr("width", width)
				.attr("height", height);

			
			var x = d3.scaleTime().rangeRound([0, width]);
			var y = d3.scaleLinear().rangeRound([height, 0]);

			var line = d3.line()
				.x(function(d) { return x(d.psadate); })
				.y(function(d) { return 25 * y(Math.log(+d.psa_total)); });
			
			x.domain(d3.extent(patients, function(patient) { return patient.psadate; } ));
			y.domain(d3.extent(patients, function(patient) { return 25 * Math.log(patient.psa_total); } ));

			var g = svg.append("g")
		        .attr("transform", "translate(" + 0 + "," + height / 2 + ")")
		        .call(d3.axisBottom(x))
		      .select(".domain")
		        .remove();

		    g.append("g")
			    .call(d3.axisLeft(y))
			  .append("text")
			    .attr("fill", "blue")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 6)
			    .attr("dy", "0.71em")
			    .attr("text-anchor", "end")
			    .text("Price ($)");

		  	g.append("path")
		        .datum(patients)
		        .attr("fill", "none")
		        .attr("stroke", "steelblue")
		        .attr("stroke-linejoin", "round")
		        .attr("stroke-linecap", "round")
		        .attr("stroke-width", 1.5)
		        .attr("d", line);
			
			var div = d3.select(".canvas").append("div")	
		    	.attr("class", "tooltip")				
		    	.style("opacity", 0);

			svg.selectAll("circle")
				.data(patients.slice(0, 100))
				.enter()
				.append("circle")
				.attr("cx", function (p) {
					return p.lopnr_new / 3.9 + 10;
				})
				.attr("cy", function (p) {

					return height - 100 * Math.log(p.psa_total) + 80;
				})
				.attr("r", function (p) {
					return 10;
				})
				.attr("fill", function (p) {
					return color(+p.psa_total);
				})
				.attr("stroke", "steelblue")
				.attr("stroke-width", 3)
				.on("mouseover", function (d) {
		          div.transition()		
		              .duration(200)		
		              .style("opacity", .9);	
		          div.html(d.lopnr_new)	
		              .style("left", (d3.event.pageX) + "px")		
		              .style("top", (d3.event.pageY) + "px");	
			    })
		        .on("mouseout", function(d) {		
		          div.transition()		
		              .duration(500)		
		              .style("opacity", 0);	
		        });

			
		})
		console.log("Hello World!");
	}

}

export default Lens