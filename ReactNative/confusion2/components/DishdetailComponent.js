import React, { Component,useState } from 'react';
import { Text, View, ScrollView, FlatList,StyleSheet,TouchableHighlight } from 'react-native';
import {Modal} from 'react-native';
import { Input, AirbnbRating,Button,Rating } from 'react-native-elements';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';



const styles = StyleSheet.create({
    modal: {
      justifyContent: 'center',
      margin: 20
   },
   modalTitle: {
       fontSize: 24,
       fontWeight: 'bold',
       backgroundColor: '#512DA8',
       textAlign: 'center',
       color: 'white',
       marginBottom: 20
   },
   modalText: {
       fontSize: 18,
       margin: 10
   },
   formRow: {
     alignItems: 'center',
     justifyContent: 'center',
     flex: 1,
     flexDirection: 'row',
     margin: 20
   },
   formLabel: {
       fontSize: 18,
       flex: 2
   },
   formItem: {
       flex: 1
   }
});
  

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites:state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId,rating, author,comment) => dispatch(postComment(dishId,rating, author,comment))
    
  });

function RenderDish(props) {
    
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
                <View  >
                    <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />

                    <Icon
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() => props.onModal() }
                    />

                </View>
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {props.showModal}
                    onDismiss = {() => this.onModal() }
                    onRequestClose = {() => this.onModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Comment</Text>
                       
                            <AirbnbRating
                            count={5}
                            reviews={["Rating 1/5", "Rating 2/5", "Rating 3/5", "Rating 4/5", "Rating 5/5"]}
                            defaultRating={3}
                            size={20}
                            onFinishRating={props.ratingCompleted}
                       
                            />
                        
                        <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onBlur={props.authorCompleted}
                        />
                        <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        onBlur={props.commentCompleted}
                        />
                        <View style={{margin: 10}}>
                        <Button 
                            onPress = {() =>{props.saveComment();}}
                            color="#512DA8"
                            title="Comment" 
                            />
                        </View>
                        <View style={{margin: 10}}>
                        <Button 
                            onPress = {() =>{props.onModal();}}
                            color="#512DA8"
                            title="Cancel" 
                            />
                        </View>
                    </View>
                </Modal>
            </Card>

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
                <Text style={{fontSize: 14}} style={{margin: 10}}>{item.comment}</Text>
                <Text style={{margin: 10}}>
                <Rating
                    imageSize={10}
                    readonly
                    startingValue={item.rating}
                    /> 
                      Stars</Text>
                <Text style={{margin: 10}} style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
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
            showModal: false,
            rating:3,
            author:'',
            comment:''
        }
    }


    ratingCompleted(rating) {
        console.log("Rating is: " + rating);
        alert("Rating is: " + rating);
        this.setState({rating:rating});
      }

      authorCompleted(text) {
        console.log("text is: " + text.nativeEvent.text);
        alert("text is: " + text.nativeEvent.text);
        this.setState({author:text.nativeEvent.text});
      }

      commentCompleted(text) {
        console.log("text is: " + text.nativeEvent.text);
        alert("text is: " + text.nativeEvent.text);
        this.setState({comment:text.nativeEvent.text});
      }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
        }

    saveComment(dishId){
        this.props.postComment(
            dishId,
            this.state.rating,
            this.state.author,
            this.state.comment
        );
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
                    onModal={() => this.toggleModal()} 
                    showModal={this.state.showModal}
                    ratingCompleted={(rating) => this.ratingCompleted(rating)}
                    authorCompleted={(text) => this.authorCompleted(text)}
                    commentCompleted={(text) => this.commentCompleted(text)}
                    saveComment={() => this.saveComment(dishId)}
                    />

            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        </ScrollView>
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);