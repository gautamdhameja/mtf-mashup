import React, { Component } from 'react'
import { Button, Icon, Item, Label, Rating, Checkbox } from 'semantic-ui-react'
import marked from 'marked'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const DashboardItem = ({ artists, id, track, description, onClick }) => (
    <Item>
        <Item.Image>
            <Icon name="info" size="large" />
        </Item.Image>

        <Item.Content>
            <Item.Header><span className="auditHeader">Artists: </span>{artists}</Item.Header>
            <Item.Meta>
                <Label>Track: {track}</Label> <br />
            </Item.Meta>
            <Item.Description content={description}></Item.Description>
            <Item.Extra>
            <Checkbox primary floated='right' onChange={ onClick }/>
            </Item.Extra>
        </Item.Content>
    </Item>
)

DashboardItem.propTypes = {
    onClick: PropTypes.func.isRequired
}

class Dashboard extends Component {
    getHistory() {
        this.props.onSubmit(this.props.seed, this.props.email, this.props.selections)
    }

    itemClicked(track) {
        this.props.selections.push(track)
    }

    render() {
        const { data } = this.props
        return (
            <div>
                <h3>Tracks</h3>
                <hr />
                <Button primary floated='right' onClick={() => this.getHistory()}>
                    Mashup
                    <Icon name='right chevron' />
                </Button>
                <br /><br /><br />
                <Item.Group divided className="results">
                    {data.map(element => <DashboardItem key={element.track} {...element} onClick={() => this.itemClicked(element.track)} />)}
                </Item.Group>
                <br /><br /><br />
            </div>
        )
    }
}

export default Dashboard
