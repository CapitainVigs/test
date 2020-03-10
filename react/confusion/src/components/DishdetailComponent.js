import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {

renderComments(comments){

    const list = comments.map((comment) => {
         if (comment.comment!= null)
            return (
              
                <li key={comment.id}>
                <div>
                    {comment.comment}
                  </div>
                  <div>
                    --{comment.author} {comment.date}
                </div>
                </li>

             
            );

        else
            return(
                <div></div>
            );

        });
 
   

     return(
    <div>
    <h4>Comments</h4>
         <ul className="list-unstyled">
                        {list}
        </ul>
    </div>
        );



}
 
  render() {

      if (this.props.dish != null)

        return (

            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                              <CardTitle>{this.props.dish.name}</CardTitle>
                              <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                    </Card>
                </div>

                <div className="col-12 col-md-5 m-1">
                    
                

                {this.renderComments(this.props.dish.comments)}
               
                </div>

            </div>


            );

        else
            return(
                <div></div>
            );
    }

   }





export default DishDetail;