import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { generateMnemonic, setSeed, getHistory } from '../actions'
import WalletForm from '../components/Wallet'


export default connect(

    state => ({
        initialValues: { seed: state.app.seed }
    }),

    dispatch => ({
        onSubmit: values => {
            dispatch(setSeed(values))
            dispatch(getHistory())
            dispatch(push('/dashboard'))
        },

        onGenerateMnemonic: () => dispatch(generateMnemonic())
    })

)(WalletForm)
