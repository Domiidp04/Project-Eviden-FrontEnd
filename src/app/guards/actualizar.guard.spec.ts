import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { actualizarGuard } from './actualizar.guard';

describe('actualizarGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => actualizarGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
