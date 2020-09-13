
import React, {Component} from 'react';
import M from 'materialize-css';
//import link from '../../../images/link.jpg';
import Card from './Card';

class Featured extends Component{
    componentDidMount() {
        const options = {
          duration: 200,
          padding:0,
          dist: -100,
          shift: 100,


          onCycleTo: () => {
            
          }
        };

        M.Carousel.init(this.Carousel, options);
    
         let instance = M.Carousel.getInstance(this.Carousel);
         instance.next(1);
         instance.set(5);
      }

      renderCard(){
        return <Card />
      }

    render(){
        return (
            <div className='center-align'>
                <h4 className='purple-text'>Featured Products</h4>
                <div className="carousel" ref={Carousel => {
                    this.Carousel = Carousel;
                  }}>
                  <div className='carousel-item'>
                     {this.renderCard()}
                  </div>
                </div>
            </div>
        );
    };
};

export default Featured;
