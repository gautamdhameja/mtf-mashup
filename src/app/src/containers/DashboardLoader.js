import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import { submitSelections } from '../actions'

export default connect(
    (state, ownProps) => ({
        data: state.history.data || [],
        selections: [],
        seed: state.app.seed,
        email: state.app.email
    }),

    dispatch => ({
        onSubmit: (seed, email, selections) => {
            dispatch(submitSelections(seed, email, selections))
        }
    })
)(Dashboard)
