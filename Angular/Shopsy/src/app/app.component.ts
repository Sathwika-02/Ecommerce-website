import { Component } from '@angular/core';
import { PublicService } from './services/public.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shopsy';
  msg:any;
  constructor(private pservice:PublicService){}
   ngOnInit():void{
    this.showMessage();
   }
   showMessage(){
    this.pservice.getMessage().subscribe(data=>{
      this.msg=data;
      console.log(this.msg);
    })
   }
}
