import { Component } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent {
  imageUrl: any[] = [
    { url: 'assets/Images/images/image1.png', title: 'Title 1', description: 'Description 1' },
    { url: '../assets/Images/images/image2.png', title: 'Title 2', description: 'Description 2' },
    { url: '../assets/Images/images/image3.png', title: 'Title 3', description: 'Description 3' }
  ];
  imageUrls = [
    {
      image:
        "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/7fd0e4ab26429926.jpg?q=50",
      thumbImage:
        "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/7fd0e4ab26429926.jpg?q=50"
    },
    {
      image:
        "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/1866ae4778f23fbb.jpg?q=50",
      thumbImage:
        "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/1866ae4778f23fbb.jpg?q=50"
    },
    {
      image:
        "https://n1.sdlcdn.com/imgs/k/o/m/903_282_Kitchen_web17may-7c96f.jpg",
      thumbImage:
        "https://n1.sdlcdn.com/imgs/k/o/m/903_282_Kitchen_web17may-7c96f.jpg",
    
    },
    {
      image:
        "hhttps://n1.sdlcdn.com/imgs/k/o/m/903_282_Kurta_Sets_17may-5fdef.jpg",
      thumbImage:
        "https://n1.sdlcdn.com/imgs/k/o/m/903_282_Kurta_Sets_17may-5fdef.jpg",
     
    },
  ];

}
