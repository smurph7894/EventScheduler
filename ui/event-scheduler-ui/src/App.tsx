import React from 'react';
import { Routes, Route } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import { Resource, Endpoint } from '@rest-hooks/rest';
import { useSuspense } from 'rest-hooks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
    </div>
  );
}

function About() {
  return (
      <div>
          <h1>This is the about page</h1>
      </div>
  )
}

function Contact() {
  const weather = useSuspense( weatherDetail);
  console.log("weather", weather);
  return (
      <div>
          <h1>This is the contact page</h1>
          {weather.map((w,index) => {
            return <div key={index}> 
              <span>{w.date}</span>
              <span>{w.temperatureC}</span>
              <span>{w.temperatureF}</span>
              <span>{w.summary}</span>
            </div>
          })}
      </div>
  )
}

interface Weather {
  date: string,
  temperatureC: number,
  temperatureF: number,
  summary: string
}

const fetchWeatherDetail = (): Promise<Weather[]> => fetch('/WeatherForecast').then(res => res.json());
const weatherDetail = new Endpoint(fetchWeatherDetail);

export default App;
