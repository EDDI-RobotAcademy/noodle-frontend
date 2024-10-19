<template>
  <div class="draggable-section" :class="{ 'open': isDraggableSectionOpen, 'dragging': isDragging }" ref="draggableSection">
    <div class="draggable-handle" @mousedown="handleMouseDown">
      <span class="handle-icon">⋮</span>
    </div>
    <div class="draggable-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragSection',
  data() {
    return {
      isDraggableSectionOpen: false,
      isDragging: false,
      dragStartX: 0,
      dragStartWidth: 0,
    };
  },
  methods: {
    handleMouseDown(e) {
      e.preventDefault();
      this.isDragging = false;
      this.dragStartX = e.clientX;
      this.dragStartWidth = this.$refs.draggableSection.offsetWidth;
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseMove(e) {
      if (!this.isDragging) {
        this.isDragging = true;
        this.isDraggableSectionOpen = true;
      }
      const deltaX = this.dragStartX - e.clientX;
      const newWidth = this.dragStartWidth + deltaX;
      const maxWidth = window.innerWidth - 20;
      if (newWidth > 20 && newWidth <= maxWidth) {
        this.$refs.draggableSection.style.width = `${newWidth}px`;
      }
      this.adjustDraggableSectionSize();
    },
    handleMouseUp(e) {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      if (!this.isDragging) {
        this.toggleDraggableSection();
      } else if (this.$refs.draggableSection.offsetWidth < 50) {
        this.isDraggableSectionOpen = false;
        this.$refs.draggableSection.style.width = '';
      }
      this.isDragging = false;
    },
    toggleDraggableSection() {
      this.isDraggableSectionOpen = !this.isDraggableSectionOpen;
      if (this.isDraggableSectionOpen) {
        this.$refs.draggableSection.style.width = '25%';
      } else {
        this.$refs.draggableSection.style.width = '';
      }
      this.$nextTick(() => {
        this.adjustDraggableSectionSize();
      });
    },
    adjustDraggableSectionSize() {
      const draggableSection = this.$refs.draggableSection;
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
.draggable-section {
  position: fixed;
  right: 0;
  top: 0;
  width: 20px;
  height: 100vh;
  background-color: #2f2f2f;
  transition: width 0.3s ease;
  overflow: visible;
  z-index: 1000;
}

.draggable-section.open {
  width: 25%;
}

.draggable-section.dragging {
  transition: none;
}

.draggable-handle {
  position: absolute;
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background-color: rgba(204, 159, 1);
  cursor: ew-resize;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1001;
  border-radius: 30px 0 0 30px;
  padding-right: 10px;
}

.handle-icon {
  color: white;
  font-size: 20px;
  transform: rotate(90deg);
}

.draggable-content {
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-left: 40px;
  color: white;
  overflow-y: auto;
  box-sizing: border-box;
}

.draggable-section:not(.open) .draggable-content {
  display: none;
}
</style>
