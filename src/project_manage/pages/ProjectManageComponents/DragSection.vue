<template>
  <div class="drag-section" :class="{ 'drag-section--open': isDragSectionOpen, 'drag-section--dragging': isDragging }" ref="dragSection">
    <div class="drag-handle" @mousedown="handleMouseDown">
      <svg class="drag-handle-icon" viewBox="0 0 24 24" width="24" height="24">
        <path :d="arrowPath" fill="none" stroke="white" stroke-width="2" />
      </svg>
    </div>
    <div class="drag-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragSection',
  data() {
    return {
      isDragSectionOpen: false,
      isDragging: false,
      dragStartX: 0,
      dragStartWidth: 0,
    };
  },
  computed: {
    arrowPath() {
      return this.isDragSectionOpen
        ? 'M9 6l6 6-6 6'
        : 'M15 6l-6 6 6 6'
    }
  },
  methods: {
    handleMouseDown(e) {
      e.preventDefault();
      this.isDragging = false;
      this.dragStartX = e.clientX;
      this.dragStartWidth = this.$refs.dragSection.offsetWidth;
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseMove(e) {
      if (!this.isDragging) {
        this.isDragging = true;
      }
      
      const deltaX = this.dragStartX - e.clientX;
      let newWidth = this.dragStartWidth + deltaX;
      newWidth = Math.max(newWidth, 30);

      const maxWidth = window.innerWidth - 20;
      if (newWidth <= maxWidth) {
        this.$refs.dragSection.style.width = `${newWidth}px`;
        this.isDragSectionOpen = newWidth > 30;
      }
      this.adjustDraggableSectionSize();
    },
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      
      if (!this.isDragging) {
        this.toggleDraggableSection();
      } else if (this.$refs.dragSection.offsetWidth < 50) {
        this.closeDragSection();
      }
      this.isDragging = false;
    },
    toggleDraggableSection() {
      this.isDragSectionOpen = !this.isDragSectionOpen;
      this.updateDragSectionWidth();
    },
    closeDragSection() {
      this.isDragSectionOpen = false;
      this.updateDragSectionWidth();
    },
    updateDragSectionWidth() {
      this.$refs.dragSection.style.width = this.isDragSectionOpen ? '25%' : '0';
      this.$nextTick(this.adjustDraggableSectionSize);
    },
    adjustDraggableSectionSize() {
      const draggableSection = this.$refs.dragSection;
      draggableSection.style.height = `${window.innerHeight}px`;
      draggableSection.style.top = '0';
    }
  },
  mounted() {
    this.adjustDraggableSectionSize();
    window.addEventListener('resize', this.adjustDraggableSectionSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustDraggableSectionSize);
  }
};
</script>

<style scoped>
.drag-section {
  position: fixed;
  right: 0;
  top: 0;
  width: 0;
  height: 100vh;
  background-color: #2f2f2f;
  transition: width 0.3s ease;
  overflow: visible;
  z-index: 1000;
}

.drag-section--open {
  width: 25%;
}

.drag-section--dragging {
  transition: none;
}

.drag-handle {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background-color: rgba(204, 159, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  border-radius: 30px 0 0 30px;
}

.drag-handle-icon {
  width: 24px;
  height: 24px;
}

.drag-content {
  width: 100%;
  height: 100%;
  padding: 20px;
  color: white;
  overflow-y: auto;
  box-sizing: border-box;
}

.drag-section:not(.drag-section--open) .drag-content {
  display: none;
}
</style>
