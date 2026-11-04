"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

export type Photo = {
  id: string;
  file: File;
  preview: string;
};

type Props = {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  onRemove: (id: string) => void;
};

function SortablePhoto({
  photo,
  index,
  onRemove,
}: {
  photo: Photo;
  index: number;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: photo.id });

  return (
    <div
      ref={setNodeRef}
      className={
        "photo-card " + (isDragging ? "dragging" : "")
      }
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      <div className="photo-preview">
        <img
          src={photo.preview}
          alt={photo.file.name}
          draggable={false}
        />

        <span className="page-number">
          {index + 1}
        </span>

        <button
          type="button"
          className="remove-photo"
          onClick={() => onRemove(photo.id)}
          aria-label="Excluir imagem"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="photo-controls">
        <span>Página {index + 1}</span>

        <button
          type="button"
          className="drag-handle"
          aria-label={"Mover página " + (index + 1)}
          {...attributes}
          {...listeners}
        >
          <GripVertical size={19} />
        </button>
      </div>
    </div>
  );
}

export default function SortableImageGrid({
  photos,
  onChange,
  onRemove,
}: Props) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = photos.findIndex(
      (photo) => photo.id === active.id
    );

    const newIndex = photos.findIndex(
      (photo) => photo.id === over.id
    );

    if (oldIndex < 0 || newIndex < 0) return;

    onChange(arrayMove(photos, oldIndex, newIndex));
  }

  if (photos.length === 0) return null;

  return (
    <section className="pages-section">
      <div className="section-header">
        <div>
          <h2>Suas páginas</h2>
          <p>Arraste pelo ícone para reorganizar</p>
        </div>

        <span className="page-count">
          {photos.length} {photos.length === 1
            ? "foto"
            : "fotos"}
        </span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={photos.map((photo) => photo.id)}
          strategy={rectSortingStrategy}
        >
          <div className="photos-grid">
            {photos.map((photo, index) => (
              <SortablePhoto
                key={photo.id}
                photo={photo}
                index={index}
                onRemove={onRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}