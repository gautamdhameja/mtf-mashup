import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import WalletLoader from '../containers/WalletLoader'
import DashboardLoader from '../containers/DashboardLoader'

const App = () => (
    <div>
        <Route path="/" component={WalletLoader} />
        <Container>
            <Route path="/dashboard" component={DashboardLoader} />
        </Container>
    </div>
)

export default App
