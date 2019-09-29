import React, { Component } from 'react';
import { jarallax } from 'jarallax';

class ParallaxBlock extends Component {
    constructor(props) {
        super(props)
        this.jarallax = React.createRef()
    }

    componentDidMount() {
        jarallax(this.jarallax.current, { speed: 0.2 })
    }

    componentWillUnmount() {
        jarallax(this.jarallax.current, 'destroy')
    }

    render() {
        return (
            <div className={'jarallax ' + this.props.customClassName} style={{height: this.props.height}}
                ref={this.jarallax}>
                <img className="jarallax-img" alt={this.props.alt || ''}
                    src={this.props.image} />
                {this.props.children}
            </div>
        )
    }
}

export default ParallaxBlock