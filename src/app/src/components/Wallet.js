import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'

class Wallet extends Component {
    state = { generated: false }

    handleGenerated = () => {
        this.setState({ generated: true })
        this.props.onGenerateMnemonic()
    }

    render() {
        const { handleSubmit, onGenerateMnemonic } = this.props;
        const { generated } = this.state;

        return (
            <div className="full-page">
                <div className="main">
                    <h1>Slush Music // </h1>

                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <Form.Field>
                            <label>Set your email</label>
                            <Field name="email" component="input" type="text" placeholder='music@slush.com' autoComplete="off" />
                        </Form.Field>
                        <Form.Field>
                            <label>Set your password</label>
                            <Field name="seed" component="input" type="text" placeholder='lets create some music...' autoComplete="off" />
                        </Form.Field>
                        <Button primary type='submit'>Submit</Button>
                        <Button type='button' onClick={this.handleGenerated}>Generate a new password</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

Wallet.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onGenerateMnemonic: PropTypes.func.isRequired
}

const WalletForm = reduxForm({
    form: 'wallet',
    // enableReinitialize: true
})(Wallet)


export default WalletForm
