import React, { Component,useState } from 'react';
import { Text, View, ScrollView, FlatList,StyleSheet,TouchableHighlight } from 'react-native';
import { Card, Icon, Modal } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';


  

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites:state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
    
  });

function RenderDish(props) {
    const [modalVisible, setModalVisible] = useState(false);

    const dish = props.dish;
    
        if (dish != null) {
            return(
        <ScrollView>
                <Card
            featuredTitle={dish.name}
            image={{uri: baseUrl + dish.image}}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View >
                    <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />


                   

                </View>
            </Card>
            <View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View>
                    <View>
                        <Text>Hello World!</Text>

                        <TouchableHighlight
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Text >Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </Modal>

                
                <TouchableHighlight
       onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text >Show Modal</Text>
      </TouchableHighlight>


                
                </View>
        </ScrollView>
             );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}


class Dishdetail extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }


    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

     markFavorite(dishId) {
        this.props.postFavorite(dishId);
        }

        

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
        <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        </ScrollView>
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);