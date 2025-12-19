import { TestBed } from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserDto } from '../../dto/user-dto';
import {UserService} from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockUser: UserDto;

  beforeEach(() => {
    // 📌 1. Configuration du TestBed
    // TODO: Vous devez configurer le TestBed avec les imports nécessaires
    // Indices:
    // - Importer HttpClientTestingModule (pour mocker les requêtes HTTP)
    // - Fournir AuthService

      TestBed.configureTestingModule({
          providers: [
              AuthService,
              provideHttpClientTesting()
          ]
      })


    // 📌 2. Récupérer le service et le httpMock
    // TODO: Utiliser TestBed.inject() pour récupérer le service et httpMock

      service = TestBed.inject(AuthService);
      httpMock = TestBed.inject(HttpTestingController);

    // 📌 3. Créer un user de test
    // TODO: Créer une variable mockUser avec id, email, username, createdAt

      mockUser: UserDto = {
          id: 1,
          email: "test@test.be",
          username: "tester",
          createdAt: new Date()
      }

  });

  // IMPORTANT: Nettoyer après chaque test
  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes non consumées
  });

  // ============================================
  // TEST 1 : Création du service
  // ============================================
  it('should be created', () => {
    // TODO: Vérifier que le service existe
    // Utilisez: expect(service).toBeTruthy();

  });

  // ============================================
  // TEST 2 : initializeAuth() lors de la construction
  // ============================================
  it('should call getCurrentUser on initialization', () => {
    // TODO:
    // 1. Créer un spy sur getCurrentUser (utilisez spyOn)
    // 2. Créer une nouvelle instance du service
    // 3. Vérifier que getCurrentUser a été appelé
    // Indice: spyOn(service, 'getCurrentUser').and.returnValue(of(mockUser));

  });

  // ============================================
  // TEST 3 : getCurrentUser() - Succès
  // ============================================
  it('should fetch current user successfully', () => {
    // TODO:
    // 1. Appeler service.getCurrentUser()
    // 2. Utiliser httpMock.expectOne() pour intercepter la requête GET
    // 3. Vérifier que l'URL est correcte
    // 4. Répondre avec mockUser using req.flush()
    // 5. Vérifier que currentUserSubject a été mis à jour
    //
    // Structure:
    // service.getCurrentUser().subscribe(user => {
    //   expect(user).toEqual(mockUser);
    // });
    // const req = httpMock.expectOne(request => request.url.includes('user/getUser/me'));
    // expect(req.request.method).toBe('GET');
    // expect(req.request.withCredentials).toBe(true);
    // req.flush(mockUser);
  });

  // ============================================
  // TEST 4 : getCurrentUser() met à jour isAuthenticated$
  // ============================================
  it('should update isAuthenticated$ to true when user is fetched', () => {
    // TODO:
    // 1. Souscrire à isAuthenticated$
    // 2. Appeler getCurrentUser()
    // 3. Intercepter la requête HTTP
    // 4. Répondre avec mockUser
    // 5. Vérifier que isAuthenticated$ a reçu true
    //
    // Indice: Les Observables envoient les valeurs via subscribe
    // let isAuthenticated = false;
    // service.isAuthenticated$.subscribe(value => {
    //   isAuthenticated = value;
    // });
  });

  // ============================================
  // TEST 5 : logout() - Succès
  // ============================================
  it('should logout successfully', () => {
    // TODO:
    // 1. Appeler service.logout()
    // 2. Intercepter la requête POST à 'auth/logout'
    // 3. Répondre avec req.flush({})
    // 4. Vérifier que localStorage.authToken a été supprimé
    // 5. Vérifier que isAuthenticated$ est false
    //
    // Indice: Vérifiez localStorage.getItem('authToken') === null
  });

  // ============================================
  // TEST 6 : logout() - Error handling
  // ============================================
  it('should handle logout error gracefully', () => {
    // TODO:
    // 1. Appeler service.logout()
    // 2. Intercepter la requête POST
    // 3. Répondre avec une ERREUR using req.error()
    // 4. Vérifier que même avec une erreur:
    //    - localStorage.authToken est supprimé
    //    - isAuthenticated$ est false
    //    - currentUser$ est null
    //
    // Indice: req.error(new ErrorEvent('Network error'))
  });

  // ============================================
  // TEST 7 : loginWithGoogle()
  // ============================================
  it('should redirect to Google login', () => {
    // TODO:
    // 1. Sauvegarder l'URL originale: const originalUrl = window.location.href;
    // 2. Spier sur window.location (utiliser spyOnProperty)
    // 3. Appeler service.loginWithGoogle()
    // 4. Vérifier que window.location.href a été défini
    // 5. Vérifier qu'il contient 'auth/google/login'
    //
    // Indice: spyOnProperty(window.location, 'href').and.returnValue(...);
  });

  // ============================================
  // TEST 8 : getCurrentUser() - Error
  // ============================================
  it('should handle getCurrentUser error', () => {
    // TODO:
    // 1. Appeler service.getCurrentUser()
    // 2. Intercepter la requête HTTP
    // 3. Répondre avec une ERREUR (401 Unauthorized)
    // 4. Dans le subscribe error handler, vérifier:
    //    - currentUserSubject est null
    //    - isAuthenticatedSubject est false
    //
    // Indice:
    // service.getCurrentUser().subscribe(
    //   () => {},
    //   error => { expect(error).toBeTruthy(); }
    // );
    // const req = httpMock.expectOne(...);
    // req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  // ============================================
  // TEST 9 : currentUser$ observable
  // ============================================
  it('should expose currentUser$ observable', (done) => {
    // TODO:
    // 1. Souscrire à service.currentUser$
    // 2. Vérifier que la valeur initiale est null
    // 3. Simuler un utilisateur connecté
    // 4. Vérifier que la nouvelle valeur est mockUser
    // 5. Appeler done() quand terminé
    //
    // Structure:
    // let currentUser: UserDto | null = null;
    // service.currentUser$.subscribe(user => {
    //   currentUser = user;
    // });
    // Vérifier initial: expect(currentUser).toBeNull();
  });
});
