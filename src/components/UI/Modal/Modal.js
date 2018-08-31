import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {
    //don't unneccessarily re-render Modal if modal is not clicked or shown
    shouldComponentUpdate(nextProp, nextState) {
        return nextProp.show !== this.props.show || nextProp.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[Modal] componentWillUpdate' );
    }

    render() {
        return (
            <Aux>
            <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
            <div
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }} 
                className={classes.Modal}>
                {this.props.children}
            </div>
        </Aux>
        )
    }
}

export default Modal;