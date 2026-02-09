import '../styles/Content.css'
import { useEffect, useRef } from 'react'
import { Carousel } from 'bootstrap'
import { useNavigate } from 'react-router-dom';

import cleaningcarousel from "../assets/images/cleaning-carousel.jpg"
import appliancecarousel from "../assets/images/appliance-carousel.jpg"
import paintingcarousel from "../assets/images/painting-carousel.jpg"

import taprepair from "../assets/images/tap-repair.jpg"
import laptoprepair from "../assets/images/laptop-repair.jpg"
import surveillance from "../assets/images/surveillance.jpg"
import switchrepair from "../assets/images/switch-repair.jpg"
import washingmachinerepair from "../assets/images/washing-machine-repair.jpg"
import geyserrepair from "../assets/images/geyser-repair.jpg"


const scrollservicecards = [
    {
        id:1, servicesimg: taprepair, title: "Tap Repair", skillnavigate: 'Plumbing'
    },
    {
        id:2, servicesimg: geyserrepair, title: "Geyser Repair", skillnavigate: 'Appliance Repair'
    },
    {
        id:3, servicesimg: surveillance, title: "Surveillance", skillnavigate: 'Surveillance'
    },
    {
        id:4, servicesimg: switchrepair, title: "Switch Board Repair", skillnavigate: 'Electrical'
    },
    {
        id:5, servicesimg: laptoprepair, title: "Laptop Repair", skillnavigate: 'Laptop Repair'
    },
    {
        id:6, servicesimg: washingmachinerepair, title: "Washing Machine Repair", skillnavigate: 'Appliance Repair'
    }
]

export default function Content() {
  const carouselRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!carouselRef.current) return

    const carousel = new Carousel(carouselRef.current, {
      ride: "carousel",
      wrap: true,
    })

    carousel.cycle()
  }, [])

  return (
    <div className="content-wrapper">
        <div className="carouseldiv">
          <div className='service-carousel-head'><h1>Make your home & appliances perfect</h1></div>
          <div className="service-carousel">
            <div ref={carouselRef} id="carouselExampleAutoplaying" className="carousel slide" data-bs-interval="3000">
                <div className="carousel-inner">
                    <div className="carousel-item active" onClick={() => navigate("/availablePartners", { state: { skill: 'Painting' } })}>
                      <img src={paintingcarousel} className="d-block w-100" alt="painting" />
                    </div>
                    <div className="carousel-item" onClick={() => navigate("/availablePartners", { state: { skill: 'Appliance Repair' } })}>
                      <img src={appliancecarousel} className="d-block w-100" alt="appliance" />
                    </div>
                    <div className="carousel-item" onClick={() => navigate("/availablePartners", { state: { skill: 'Cleaning' } })}>
                      <img src={cleaningcarousel} className="d-block w-100" alt="cleaning" />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" />
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"  data-bs-slide="next">
                    <span className="carousel-control-next-icon" />
                </button>
            </div>
          </div>
        </div>

        <div className="service-scroll">
          <div className='services-scroll-head'><h1>Most used services</h1></div>
          <div className="scroll-elements">
            {scrollservicecards.map((scrolldata)=>(
              <div className="scroll-service-card" key={scrolldata.id} onClick={() => navigate("/availablePartners", { state: { skill: scrolldata.skillnavigate } })}> 
                  <img src={scrolldata.servicesimg} className="scroll-service-img" alt={scrolldata.title}></img>
                  <p className="scroll-service-title">{scrolldata.title}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}