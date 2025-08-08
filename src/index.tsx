import { createRoot } from 'react-dom/client';
import ReactCursorPosition from 'react-cursor-position';
import ModernToggle from './components/ModernToggle';
import ModernSelect from './components/ModernSelect';
import ModernInputGroup from './components/ModernInputGroup';
import _ from 'lodash';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { positionParser } from './api/parsePoints';

import './index.css';
import './styles/modern-ui.css';
import PositionSetter from './pointSetter';

import emptyArrayIfUndefined from './tools/emptyArrayIfUndefined';
import extractVariable from './tools/extractVariable';

import {
  ABSOLUTE_ANIMATION_OPTIONS,
  RELATIVE_ANIMATION_OPTIONS,
  INTERPOLATION_OPTIONS,
} from './constant';
import { Point, PlotPosition, AnimationOption } from './types';

const pivotalPoints: Point[] = [];

function App() {
  const [animated, setAnimated] = useState<boolean>(false);
  const [pivotalP, setPivotalP] = useState<Point[]>([]);
  const [plotP, setPlotP] = useState<PlotPosition>({ path: [], pivotal: [] });
  const [dropdownsOpen, setDropdownsOpen] = useState<number>(0);

  const absoluteAnimationRef = useRef<AnimationOption>(ABSOLUTE_ANIMATION_OPTIONS[0]);
  const relativeAnimationRef = useRef<AnimationOption>(RELATIVE_ANIMATION_OPTIONS[0]);
  const absoluteAnimationVariableRef = useRef(
    absoluteAnimationRef.current.variable
  );
  const relativeAnimationVariableRef = useRef(
    relativeAnimationRef.current.variable
  );

  useEffect(() => {
    let animationFrameId: number;
    
    const updateState = () => {
      setPivotalP([...pivotalPoints]);
      const rootEl = document.getElementById('root');
      if (rootEl) {
        const plotPosition = rootEl.getAttribute('plotPosition');
        const plotPositionParsed =
          plotPosition == null
            ? { path: [], pivotal: [] }
            : JSON.parse(plotPosition);

        plotPositionParsed.path = positionParser(plotPositionParsed.path);
        plotPositionParsed.pivotal = positionParser(plotPositionParsed.pivotal);
        setPlotP(plotPositionParsed);
      }
      animationFrameId = requestAnimationFrame(updateState);
    };

    animationFrameId = requestAnimationFrame(updateState);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const setAbsoluteAnimationRef = useCallback((obj: AnimationOption) => {
    absoluteAnimationRef.current = obj;
  }, []);
  
  const setRelativeAnimationRef = useCallback((obj: AnimationOption) => {
    relativeAnimationRef.current = obj;
  }, []);

  const setAbsoluteAnimationVariableRef = useCallback((arr: any) => {
    absoluteAnimationVariableRef.current = arr;
  }, []);

  const setRelativeAnimationVariableRef = useCallback((arr: any) => {
    relativeAnimationVariableRef.current = arr;
  }, []);

  useEffect(() => {
    const newIndex = _.findIndex(
      ABSOLUTE_ANIMATION_OPTIONS,
      (o) => o.label === absoluteAnimationRef.current.label
    );

    setAbsoluteAnimationVariableRef(
      ABSOLUTE_ANIMATION_OPTIONS[newIndex].variable
    );
  }, [absoluteAnimationRef.current]);

  useEffect(() => {
    const newIndex = _.findIndex(
      RELATIVE_ANIMATION_OPTIONS,
      (o) => o.label === relativeAnimationRef.current.label
    );

    setRelativeAnimationVariableRef(
      RELATIVE_ANIMATION_OPTIONS[newIndex].variable
    );
  }, [relativeAnimationRef.current]);

  const handleDragRef = useRef<(draggedPoint: Point) => void>();
  handleDragRef.current = useCallback((draggedPoint: Point) => {
    const updateIndex = _.findIndex(
      pivotalPoints,
      (p) => p.key === draggedPoint.key
    );
    if (updateIndex !== -1) {
      pivotalPoints[updateIndex] = draggedPoint;
    }
  }, []);

  const handleDoubleClickRef = useRef<(position: { x: number; y: number }) => void>();
  handleDoubleClickRef.current = useCallback((position: { x: number; y: number }) => {
    const MAX_POINT_NUM = 100;
    const key = Math.random().toString(36);
    if (pivotalPoints.length < MAX_POINT_NUM) {
      pivotalPoints.push({ position, key });
    }
  }, []);

  const setInterpolationMethod = useCallback((selectedOption: { value: string }) => {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.setAttribute('interpolationMethod', selectedOption.value);
    }
  }, []);

  const handleAbsoluteAnimationChange = useCallback((option: { value: any; label: string }) => {
    const animationOption = ABSOLUTE_ANIMATION_OPTIONS.find(opt => opt.label === option.label);
    if (animationOption) {
      setAbsoluteAnimationRef(animationOption);
    }
  }, [setAbsoluteAnimationRef]);

  const handleRelativeAnimationChange = useCallback((option: { value: any; label: string }) => {
    const animationOption = RELATIVE_ANIMATION_OPTIONS.find(opt => opt.label === option.label);
    if (animationOption) {
      setRelativeAnimationRef(animationOption);
    }
  }, [setRelativeAnimationRef]);

  const handleDropdownOpenChange = useCallback((isOpen: boolean) => {
    setDropdownsOpen(prev => prev + (isOpen ? 1 : -1));
  }, []);

  return (
    <div>
      <div className={`modern-controls-container ${dropdownsOpen > 0 ? 'modern-controls-container--expanded' : ''}`}>
        <div className="controls-section">
          <ModernToggle
            label="Animation"
            checked={animated}
            onChange={setAnimated}
          />
        </div>
        
        <div className="controls-section">
          <ModernSelect
            label="Interpolation Method"
            options={INTERPOLATION_OPTIONS}
            onChange={setInterpolationMethod}
            onOpenChange={handleDropdownOpenChange}
          />
        </div>
        
        {animated && (
          <>
            <div className="controls-section">
              <ModernSelect
                label="Absolute Animation"
                options={ABSOLUTE_ANIMATION_OPTIONS}
                onChange={handleAbsoluteAnimationChange}
                onOpenChange={handleDropdownOpenChange}
              />
              {absoluteAnimationVariableRef.current.length > 0 && (
                <ModernInputGroup
                  title="Parameters"
                  inputs={absoluteAnimationVariableRef.current}
                  onChange={setAbsoluteAnimationVariableRef}
                />
              )}
            </div>
            
            <div className="controls-section">
              <ModernSelect
                label="Relative Animation"
                options={RELATIVE_ANIMATION_OPTIONS}
                onChange={handleRelativeAnimationChange}
                onOpenChange={handleDropdownOpenChange}
              />
              {relativeAnimationVariableRef.current.length > 0 && (
                <ModernInputGroup
                  title="Parameters"
                  inputs={relativeAnimationVariableRef.current}
                  onChange={setRelativeAnimationVariableRef}
                />
              )}
            </div>
          </>
        )}
      </div>

      <ReactCursorPosition style={{ position: "absolute" }}>
        <PositionSetter
          style={{ pointSize: 10, lineWidth: 5 }}
          animated={animated}
          relativeAnimation={relativeAnimationRef.current.value(
            extractVariable(relativeAnimationVariableRef)
          )}
          absoluteAnimation={absoluteAnimationRef.current.value(
            extractVariable(absoluteAnimationVariableRef)
          )}
          handleDoubleClick={handleDoubleClickRef.current}
          handleDrag={handleDragRef.current}
          pivotalPoints={pivotalP}
          plotPoints={plotP === null ? [] : plotP}
        />
      </ReactCursorPosition>
    </div>
  );
}
const rootElement = document.getElementById('root');

if (rootElement) {
  let animationFrameId: number;
  
  const updatePivotalPosition = () => {
    const str = '';
    rootElement.setAttribute(
      'pivotalPosition',
      str.concat(
        '[',
        pivotalPoints
          .map((point) => JSON.stringify([point.position.x, point.position.y]))
          .toString(),
        ']'
      )
    );
    animationFrameId = requestAnimationFrame(updatePivotalPosition);
  };
  
  updatePivotalPosition();
  
  const root = createRoot(rootElement);
  root.render(<App />);
}
