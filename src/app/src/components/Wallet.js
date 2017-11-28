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

    handleSubmit = (values) => {
        this.props.onSubmit(values)
    }

    render() {
        const { handleSubmit, onGenerateMnemonic } = this.props;
        const { generated } = this.state;

        return (
            <div className="full-page">
                <div className="main">
                    <h1>Slush Music // </h1>
                    <p>
                    <ul>
                        <li><strong>Create Your Own Musical IP chain!</strong></li>
                        <li>Ever wonder wtf is blockchain? Want to try it out? Well now you can by creating a composition with fully attributable IP rights, all the way down to the original artist contributions. This composition is totally immutable so that everyone will know forever that you created the piece out of contributions from the original artists!</li>
                        <br/>
                        <p>
                            1) Choose a selection of musical assets from the upcoming MTF performance. You can choose 2-4 selections which will be used to create your own composition. <br/>
                            2) Wait for an email link that will provide you with access to your new composition. <br/>
                            3) That's it! You and your IP are now on the blockchain!
                        </p>
                    </ul>
                </p>  
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <Form.Field>
                            <label>Set your email</label>
                            <Field name="email" component="input" type="text" placeholder='music@slush.org' autoComplete="off" />
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
    form: 'wallet'
})(Wallet)

export default WalletForm
