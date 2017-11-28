import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import WalletLoader from '../containers/WalletLoader'
import DashboardLoader from '../containers/DashboardLoader'

const App = () => (
    <div>
        <Route exact path="/" component={WalletLoader} />
        <Container>
            <Route exact path="/dashboard" component={DashboardLoader} />
        </Container>
    </div>
)

export default App
