import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


class DishDetail extends Component {

renderComments(comments){

    const list = comments.map((comment) => {
         if (comment.comment!= null)
            return (
              <div className="container">
                <li key={comment.id}>
                <div>
                    {comment.comment}
                  </div>
                  <div>
                    --{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </div>
                </li>

             </div>
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
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                     
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <renderComments comments={this.props.comments} />
                    </div>
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