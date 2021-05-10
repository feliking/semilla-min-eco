<template>
  <div class="pdf-view">
    <div class="pdf-view-actions">
      <div class="pdf-view-page">
        <span>Página: <span>{{ page_num }}</span> / <span> {{ page_count }}</span></span>
      </div>
      <div class="pdf-view-buttons">
        <v-btn
          type="button"
          :disabled="page_num == 1"
          v-if="page_count > 1"
          @click="onPrevPage" class="btn">
          <v-icon>keyboard_arrow_left</v-icon> Anterior</v-btn>
        <v-btn
          type="buttosn"
          :disabled="page_num == page_count"
          v-if="page_count > 1"
          @click="onNextPage" class="btn">
          Siguiente <v-icon>keyboard_arrow_right</v-icon></v-btn>
        <v-btn
          type="button"
          v-if="url || storage"
          @click="descargar()" class="btn btn-success">
          <v-icon>file_download</v-icon> Descargar PDF
        </v-btn>
      </div>
    </div>
    <canvas :id="id">Cargando PDF espere por favor...</canvas>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist';
import axios from 'axios';

export default {
  props: {
    data: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: 'app-pdf-viewer'
    },
    url: {
      type: String,
      default: ''
    },
    storage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      page_num: 0,
      page_count: 0
    };
  },
  created () {
    this.pdfDoc = null;
    this.pageNum = 1;
    this.pageRendering = false;
    this.pageNumPending = null;
    this.scale = 1.6;
  },
  mounted () {
    this.canvas = document.getElementById(this.id);
    this.ctx = this.canvas.getContext('2d');

    if (this.data) {
      this.render(this.data);

      if (this.storage) {
        window.localStorage.setItem(`pdf-${this.storage}`, this.data);
      }
    }
  },
  methods: {
    render (data) {
      // let pdfData = atob(btoa(String.fromCharCode(...new Uint8Array(data))));
      let pdfData = atob(data);

      // Disable workers to avoid yet another cross-origin issue (workers need
      // the URL of the script to be loaded, and dynamically loading a cross-origin
      // script does not work).
      // PDFJS.disableWorker = true;

      // The workerSrc property shall be specified.
      // PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

      // Using DocumentInitParameters object to load binary data.
      let loadingTask = PDFJS.getDocument({ data: pdfData });
      loadingTask.promise.then(pdsfDoc_ => {
        this.pdfDoc = pdsfDoc_;
        this.page_count = this.pdfDoc.numPages;

        // Initial/first page rendering
        this.renderPage(this.pageNum);
      }, function (error) {
        // PDF loading error
        console.error('Error PDF', error);
      });
    },
    /**
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
    renderPage (num) {
      this.pageRendering = true;
      // Using promise to fetch the page
      this.pdfDoc.getPage(num).then(page => {
        var viewport = page.getViewport(this.scale);
        this.canvas.height = viewport.height;
        this.canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: this.ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(() => {
          this.pageRendering = false;
          if (this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(this.pageNumPending);
            this.pageNumPending = null;
          }
        });
      });

      // Update page counters
      this.page_num = num;
    },
    /**
     * If another page rendering in progress, waits until the rendering is
     * finised. Otherwise, executes rendering immediately.
     */
    queueRenderPage (num) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    },
    /**
     * Displays previous page.
     */
    onPrevPage () {
      if (this.pageNum <= 1) {
        return;
      }
      this.pageNum--;
      this.queueRenderPage(this.pageNum);
    },
    /**
     * Displays next page.
     */
    onNextPage () {
      if (this.pageNum >= this.pdfDoc.numPages) {
        return;
      }
      this.pageNum++;
      this.queueRenderPage(this.pageNum);
    },
    descargar () {
      if (this.url) {
        this.$service.get(this.url)
        .then((response) => {
          console.log('PDF FILE', response);
          const url = window.URL.createObjectURL(this.b64toBlob(response.data, 'application/pdf'));
          const link = document.createElement('a');
          link.href = url;
          const d = new Date();
          link.setAttribute('download', `doc-${d.getTime()}.pdf`);
          document.body.appendChild(link);
          link.click();
        });
      } else if (this.storage) {
        let pdf = window.localStorage.getItem(`pdf-${this.storage}`);
        console.log('PDF STORAGE', pdf);
        const url = window.URL.createObjectURL(this.b64toBlob(pdf, 'application/pdf'));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `doc-${this.storage}.pdf`);
        document.body.appendChild(link);
        link.click();
      }
    },
    b64toBlob (b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      let byteCharacters = atob(b64Data);
      let byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      let blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

.pdf-view {
  canvas {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #ddd;
  }

  .pdf-view-actions {
    background: darken($primary, 0%);
    color: #f0f0f0;
    overflow: hidden;

    .pdf-view-buttons {
      float: right;
      padding-right: 5px;

      .v-btn {
        margin: 5px 0;
      }
    }

    .pdf-view-page {
      float: left;
      line-height: 46px;
      padding-left: 20px;
      font-size: 1.1rem;
    }
  }
}
</style>
