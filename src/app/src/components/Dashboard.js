import React, { Component } from 'react'
import { Button, Icon, Item, Label, Rating, Checkbox, Message } from 'semantic-ui-react'
import marked from 'marked'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const DashboardItem = ({ artists, id, track, description, onClick }) => (
    <Item>
        <Item.Image>
            <Icon size="huge" color="blue" name="music" />
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
    mashup() {
        var tracks = [...this.props.selections]
        this.props.selections.splice(0, this.props.selections.length)
        this.props.onSubmit(this.props.seed, this.props.email, tracks)
        NotificationManager.success('Your selection has been submitted!', 'Thanks!');
    }

    itemClicked(track) {
        this.props.selections.push(track)
    }

    render() {
        const { data } = this.props
        return (
            <div>
                <br /><br />
                <h2>Tracks</h2>
                <hr />
                <br /><br /><br />
                <Item.Group divided className="results">
                    {data.map(element => <DashboardItem key={element.track} {...element} onClick={() => this.itemClicked(element.track)} />)}
                </Item.Group>
                <br />
                <hr />
                <Button primary floated='right' onClick={() => this.mashup()}>
                    Mashup
                    <Icon name='right chevron' />
                </Button>
                <NotificationContainer />
            </div>
        )
    }
}

export default Dashboard
