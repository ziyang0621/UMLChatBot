class Modal {
  constructor() {
    this.modal = null;
    this.init();
  }

  init() {
    // Create modal structure
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>UML Diagram Preview</h3>
                    <button class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="diagram-controls">
                        <button class="control-btn" data-action="zoom-in">
                            <i class="fas fa-search-plus"></i>
                        </button>
                        <button class="control-btn" data-action="zoom-out">
                            <i class="fas fa-search-minus"></i>
                        </button>
                        <button class="control-btn" data-action="reset">
                            <i class="fas fa-sync"></i>
                        </button>
                        <button class="control-btn" data-action="download">
                            <i class="fas fa-download"></i>
                            Download PUML
                        </button>
                    </div>
                    <div class="diagram-container">
                        <div class="diagram-wrapper">
                            <img src="" alt="UML Diagram" class="diagram-image">
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Add event listeners
    this.modal
      .querySelector('.close-btn')
      .addEventListener('click', () => this.close());
    this.modal.querySelectorAll('.control-btn').forEach((btn) => {
      btn.addEventListener('click', (e) =>
        this.handleControl(e.target.closest('.control-btn'))
      );
    });

    // Add to document
    document.body.appendChild(this.modal);
  }

  open(imageUrl) {
    this.modal.querySelector('.diagram-image').src = imageUrl;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleControl(button) {
    const action = button.dataset.action;
    const wrapper = this.modal.querySelector('.diagram-wrapper');
    const currentScale =
      parseFloat(
        wrapper.style.transform.replace('scale(', '').replace(')', '')
      ) || 1;

    switch (action) {
      case 'zoom-in':
        wrapper.style.transform = `scale(${currentScale + 0.1})`;
        break;
      case 'zoom-out':
        wrapper.style.transform = `scale(${Math.max(0.5, currentScale - 0.1)})`;
        break;
      case 'reset':
        wrapper.style.transform = 'scale(1)';
        break;
      case 'download':
        this.downloadPUML();
        break;
    }
  }

  downloadPUML() {
    // In a real implementation, this would trigger the PUML file download
    console.log('Downloading PUML file...');
  }
}

// Export the modal instance
window.umlModal = new Modal();
