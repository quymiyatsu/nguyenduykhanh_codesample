import Immutable, { List, Map } from 'immutable'

import PropTypes from 'prop-types'

const ProfileRecord = Immutable.Record({
    about_me: PropTypes.string,
    avatar: PropTypes.object,
    cover: PropTypes.object,
    email: PropTypes.string,
    full_name: PropTypes.string,
    id: PropTypes.string,
    is_following: PropTypes.bool,
    job_position: PropTypes.string,
    user: {
        articles_count: PropTypes.number,
        follow_count: PropTypes.number,
        followers_count: PropTypes.number,
    },
    work_place: PropTypes.string
})

class Profile extends ProfileRecord {
    constructor(props) {
        super(props)
    }
    turnFollowingOn() {
        return this.set('is_following', true)
      }

    turnFollowingOff() {
        return this.set('is_following', false)
     }
}

export default Profile