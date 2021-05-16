import { Component, OnInit, ViewChild } from '@angular/core';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { NgxCaptureService } from 'ngx-capture';
import { take, tap } from 'rxjs/operators';
import { ContestantsService } from '../../services/contestants.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  contestants: any[];
  votes: any[] = Array<any>(10);
  votesOpen = false;
  canSave = false;
  loadingContestants = true;
  loadingMyVotes = true;
  faShare = faShare;

  @ViewChild('ranking', { static: false }) screen: any;
  
  constructor(private contestantsService: ContestantsService, private votesSevice: VoteService, private captureService: NgxCaptureService) { }

  ngOnInit(): void {
    this.loadingContestants = true;
    this.loadingMyVotes = true;
    this.contestantsService.getGlobalRanking().pipe(take(1)).subscribe(
      (contestants: any[]) => {
        this.contestants = contestants;
        this.loadingContestants = false;
      }
    );
    this.votesSevice.getMyVotes().subscribe(
      (res: any) => {
        this.votes = res.votes.length === 10 ? res.votes : Array<any>(10);
        this.votesOpen = res.votesOpen;
        this.loadingMyVotes = false;
      },
      (err) => {
        alert(err.message)
      }
    )
  }

  pointContestant(contestant: any, index) {
    this.votes[index] = contestant;
    this.canSave = this.votes.filter(v => v && v.countryCode).length === 10;
    if (!this.canSave) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }

  clear() {
    this.votes = Array<any>(10);
    this.canSave = false;
  }

  submit() {
    this.loadingMyVotes = true;
    this.votesSevice.save(this.votes).pipe(take(1)).subscribe(
      (votes) => this.loadingMyVotes = false,
      (err) => alert("ERROR. Something went wrong. Please, try again later")
    );
  }

  hasEliminated() {
    return this.votes.filter(v => v.eliminated).length;
  }

  share() {
    const collapsables = document.getElementsByClassName("collapse");
    for (let i = 0; i < collapsables.length; i++ ) {
      collapsables.item(i).setAttribute('hidden', 'true');
    }
    const imageData = document.getElementsByClassName("image-data");
    imageData.item(0).removeAttribute("hidden");
    imageData.item(1).removeAttribute("hidden");
    this.captureService.getImage(this.screen.nativeElement, true)
        .pipe(
          tap(async img => {
            var image = new Image();
            image.src = img;
            var url = image.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
            var downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = "ranking.png";
            for (let i = 0; i < collapsables.length; i++ ) {
              collapsables.item(i).removeAttribute('hidden');
            }
            imageData.item(0).setAttribute("hidden", "true");
            imageData.item(1).setAttribute("hidden", "true");
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          })
        ).subscribe(() => {}, () => {
          for (let i = 0; i < collapsables.length; i++ ) {
            collapsables.item(i).removeAttribute('hidden');
          }
          imageData.item(0).setAttribute("hidden", "true");
          imageData.item(1).setAttribute("hidden", "true");
        });
  }

  base64ToBlob(b64Data, contentType='', sliceSize=512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }

  downloadFile(b64encodedString: string) {
    if (b64encodedString) {
      var blob = this.base64ToBlob(b64encodedString, 'text/plain');
      saveAs(blob, "test.properties");
    }
}

}
function saveAs(blob: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

