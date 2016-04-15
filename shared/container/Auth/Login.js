import { connect } from 'react-redux';
import Actions from '../../redux/actions';
import LoginView from '../../components/Auth/LoginView';


class Login extends Component {
  constructor(props, context){
    super(props, context);
    this.props = props ;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(evt){
    console.log(evt);
  }
  render(){
    return (
      <div>
        <LoginView onSubmit={handleSubmit} />
      </div>
    );
  }
}


Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Login.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
    username: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(store){
  return {
    auth: store.auth
  }
}


export default connect(mapStateToProps)(LoginView);
